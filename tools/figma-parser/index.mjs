#!/usr/bin/env node

/**
 * Figma MCP Design Context Parser
 *
 * Figma MCP `get_design_context` 결과에서 에셋(SVG/PNG) URL과
 * 레이아웃 정보(위치, 회전, 크기)를 자동 추출하는 CLI 스크립트.
 *
 * 사용법:
 *   node tools/figma-parser/index.mjs --input figma-output.txt --assets public/portfolio --prefix hero
 *   pbpaste | node tools/figma-parser/index.mjs --assets public/portfolio --prefix hero
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join, dirname } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

/* ── __dirname 대체 (ESM) ── */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* ===================================================================
   1. CLI 인자 파싱
   =================================================================== */

/** CLI 인자를 key-value 맵으로 변환 */
function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2); // "--input" → "input"
      const next = argv[i + 1];
      // 다음 인자가 없거나 또 다른 플래그면 boolean true
      if (!next || next.startsWith("--")) {
        args[key] = true;
      } else {
        args[key] = next;
        i++; // 값을 소비했으므로 한 칸 건너뜀
      }
    }
  }
  return args;
}

const args = parseArgs(process.argv);

const CANVAS_WIDTH = Number(args["canvas-width"]) || 1920;
const CANVAS_HEIGHT = Number(args["canvas-height"]) || 1056;
const PREFIX = args.prefix || "section";
const ASSETS_DIR = args.assets
  ? resolve(args.assets)
  : resolve("public/portfolio");
const OUTPUT_DIR = resolve(__dirname, "output");
const DRY_RUN = !!args["dry-run"]; // --dry-run: 다운로드 건너뜀

/* ===================================================================
   2. 입력 읽기 (파일 또는 stdin)
   =================================================================== */

/** 파일 또는 stdin에서 전체 텍스트를 읽어온다 */
function readInput() {
  if (args.input) {
    const inputPath = resolve(args.input);
    if (!existsSync(inputPath)) {
      console.error(`❌  입력 파일을 찾을 수 없습니다: ${inputPath}`);
      process.exit(1);
    }
    return readFileSync(inputPath, "utf-8");
  }

  // stdin (파이프)
  try {
    return readFileSync("/dev/stdin", "utf-8");
  } catch {
    printUsage();
    process.exit(1);
  }
}

function printUsage() {
  console.log(`
Figma MCP Design Context Parser
────────────────────────────────

사용법:
  node index.mjs --input <file> [options]
  pbpaste | node index.mjs [options]

옵션:
  --input <file>         Figma MCP 출력이 저장된 파일 경로
  --assets <dir>         에셋 다운로드 디렉토리 (기본: public/portfolio)
  --prefix <name>        파일명 접두사 (기본: section)
  --canvas-width <px>    캔버스 너비 (기본: 1920)
  --canvas-height <px>   캔버스 높이 (기본: 1056)
  --dry-run              다운로드 없이 JSON만 생성
  --help                 이 도움말 표시
`);
}

if (args.help) {
  printUsage();
  process.exit(0);
}

/* ===================================================================
   3. 에셋 URL 추출
   =================================================================== */

/**
 * `const imgXxx = "http://localhost:3845/assets/..."` 패턴에서
 * 변수명 → URL 맵을 반환한다.
 */
function extractAssetUrls(text) {
  const urlMap = new Map(); // varName → url
  const re = /const\s+(img\w+)\s*=\s*"(http:\/\/localhost:3845\/[^"]+)"/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    urlMap.set(m[1], m[2]);
  }
  return urlMap;
}

/* ===================================================================
   4. JSX 요소 파싱
   =================================================================== */

/**
 * Tailwind 클래스에서 숫자 값을 추출하는 헬퍼.
 * 예: extractTailwind("left-[120.5px]", /left-\[(-?[\d.]+)px\]/) → 120.5
 */
function extractTailwind(classStr, regex) {
  const m = classStr.match(regex);
  return m ? parseFloat(m[1]) : null;
}

/**
 * calc 위치를 파싱한다.
 * 예: "left-[calc(50%-346px)]" → 960 - 346 = 614
 *     "left-[calc(50%+120px)]" → 960 + 120 = 1080
 */
function extractCalcLeft(classStr) {
  const m = classStr.match(/left-\[calc\(50%([+-][\d.]+)px\)\]/);
  if (!m) return null;
  return CANVAS_WIDTH / 2 + parseFloat(m[1]);
}

/**
 * 회전 각도를 추출한다.
 * Tailwind: rotate-[3.41deg] 또는 -rotate-[3.41deg]
 * transform: rotate(-3.41deg)
 */
function extractRotation(classStr) {
  // "-rotate-[Xdeg]" 패턴 (음수 회전)
  const negMatch = classStr.match(/-rotate-\[([\d.]+)deg\]/);
  if (negMatch) return -parseFloat(negMatch[1]);

  // "rotate-[Xdeg]" 패턴 (양수 회전)
  const posMatch = classStr.match(/rotate-\[(-?[\d.]+)deg\]/);
  if (posMatch) return parseFloat(posMatch[1]);

  // style transform
  const styleMatch = classStr.match(/rotate\((-?[\d.]+)deg\)/);
  if (styleMatch) return parseFloat(styleMatch[1]);

  return 0;
}

/**
 * 폰트 패밀리를 추출한다.
 * 예: font-['Pretendard'] → "Pretendard"
 */
function extractFont(classStr) {
  const m = classStr.match(/font-\['([^']+)'\]/);
  return m ? m[1] : null;
}

/**
 * 폰트 크기를 추출한다.
 * 예: text-[120px] → 120
 */
function extractFontSize(classStr) {
  const m = classStr.match(/text-\[(\d+)px\]/);
  return m ? parseInt(m[1], 10) : null;
}

/**
 * 텍스트 색상을 추출한다.
 * 예: text-[#d1d5df] → "#d1d5df"
 *     text-[rgba(0,0,0,0.5)] → "rgba(0,0,0,0.5)"
 */
function extractTextColor(classStr) {
  // #hex 색상
  const hexMatch = classStr.match(/text-\[(#[\da-fA-F]+)\]/);
  if (hexMatch) return hexMatch[1];

  // rgba/rgb 색상
  const rgbaMatch = classStr.match(/text-\[(rgba?\([^)]+\))\]/);
  if (rgbaMatch) return rgbaMatch[1];

  return null;
}

/**
 * 노드 ID를 추출한다.
 * 예: data-node-id="265:109" → "265:109"
 */
function extractNodeId(elementStr) {
  const m = elementStr.match(/data-node-id="([\d:]+)"/);
  return m ? m[1] : null;
}

/**
 * 에셋 참조 변수명을 추출한다.
 * 예: src={imgVector3} → "imgVector3"
 */
function extractAssetRef(elementStr) {
  const m = elementStr.match(/src=\{(\w+)\}/);
  return m ? m[1] : null;
}

/**
 * <p> 등 텍스트 요소에서 텍스트 내용을 추출한다.
 * 예: <p className="...">MEANGIRLS</p> → "MEANGIRLS"
 */
function extractTextContent(elementStr) {
  // JSX 자식 텍스트: >텍스트</ 패턴
  const m = elementStr.match(/>([^<>{]+)</);
  return m ? m[1].trim() : null;
}

/* ===================================================================
   5. 메인 파서 — 요소별 분석
   =================================================================== */

/**
 * JSX 블록(div/img/p 등)을 개별 요소로 분리한다.
 * 간단한 휴리스틱: data-node-id 속성이 있는 최상위 요소 단위로 분리.
 */
function splitElements(text) {
  const elements = [];
  // data-node-id가 포함된 태그를 기준으로 청크를 잘라낸다
  const regex = /<(?:div|img|p|span|h[1-6]|section|figure)\b[^>]*data-node-id="[\d:]+"[^>]*(?:\/>|>[\s\S]*?<\/(?:div|img|p|span|h[1-6]|section|figure)>)/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    elements.push(m[0]);
  }
  return elements;
}

/**
 * 단일 요소를 분석하여 에셋/텍스트 데이터를 반환한다.
 */
function parseElement(elementStr, urlMap) {
  const nodeId = extractNodeId(elementStr);
  if (!nodeId) return null;

  const classStr = elementStr; // className 포함 전체 문자열에서 파싱
  const assetRef = extractAssetRef(elementStr);
  const textContent = extractTextContent(elementStr);

  // 공통: 위치/크기/회전
  const left = extractCalcLeft(classStr) ?? extractTailwind(classStr, /left-\[(-?[\d.]+)px\]/) ?? 0;
  const top = extractTailwind(classStr, /top-\[(-?[\d.]+)px\]/) ?? 0;
  const width = extractTailwind(classStr, /w-\[([\d.]+)px\]/) ?? 0;
  const height = extractTailwind(classStr, /h-\[([\d.]+)px\]/) ?? 0;
  const rotate = extractRotation(classStr);

  // 바운딩 박스 중심 (% 단위)
  const centerX = parseFloat(((left + width / 2) / CANVAS_WIDTH * 100).toFixed(2));
  const centerY = parseFloat(((top + height / 2) / CANVAS_HEIGHT * 100).toFixed(2));

  const wrapper = { left, top, width, height };
  const center = { x: centerX, y: centerY };

  // 에셋 (img 요소)
  if (assetRef && urlMap.has(assetRef)) {
    const url = urlMap.get(assetRef);
    const ext = url.match(/\.(svg|png|jpg|jpeg|webp)/i)?.[1] || "png";
    const filename = `${PREFIX}-${nodeId.replace(":", "-")}.${ext}`;

    // inner 크기 (에셋 자체 크기 — 별도 class가 있을 수 있음)
    const innerWidth = extractTailwind(classStr, /(?:^|\s)w-\[([\d.]+)px\]/) ?? width;
    const innerHeight = extractTailwind(classStr, /(?:^|\s)h-\[([\d.]+)px\]/) ?? height;

    return {
      kind: "asset",
      data: {
        nodeId,
        type: ext,
        file: filename,
        url,
        wrapper,
        center,
        rotate,
        inner: { width: innerWidth, height: innerHeight },
      },
    };
  }

  // 텍스트 요소
  if (textContent && textContent.length > 0) {
    const fontSize = extractFontSize(classStr);
    const color = extractTextColor(classStr);
    const fontFamily = extractFont(classStr);

    // calc 위치를 문자열로도 보존
    const calcMatch = classStr.match(/left-\[(calc\(50%[+-][\d.]+px\))\]/);
    const leftStr = calcMatch ? calcMatch[1] : `${left}px`;

    return {
      kind: "text",
      data: {
        nodeId,
        content: textContent,
        wrapper: { left: leftStr, top, width, height },
        center,
        rotate,
        fontSize: fontSize ? `${fontSize}px` : null,
        color,
        fontFamily,
      },
    };
  }

  // 기타 — 위치 정보만
  return {
    kind: "other",
    data: { nodeId, wrapper, center, rotate },
  };
}

/* ===================================================================
   6. 에셋 다운로드
   =================================================================== */

function downloadAssets(assets) {
  if (DRY_RUN) {
    console.log("🔸 --dry-run 모드: 다운로드를 건너뜁니다.");
    return;
  }

  if (!existsSync(ASSETS_DIR)) {
    mkdirSync(ASSETS_DIR, { recursive: true });
    console.log(`📁 디렉토리 생성: ${ASSETS_DIR}`);
  }

  for (const asset of assets) {
    const dest = join(ASSETS_DIR, asset.file);
    try {
      console.log(`⬇️  ${asset.file} ← ${asset.url}`);
      execSync(`curl -sf "${asset.url}" -o "${dest}"`, {
        timeout: 10_000,
      });
    } catch (err) {
      console.warn(`⚠️  다운로드 실패: ${asset.file} (Figma Desktop이 실행 중인지 확인)`);
    }
  }
}

/* ===================================================================
   7. JSON 출력
   =================================================================== */

function writeOutput(assets, texts, others) {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = join(OUTPUT_DIR, `${PREFIX}-layout.json`);
  const result = {
    canvasWidth: CANVAS_WIDTH,
    canvasHeight: CANVAS_HEIGHT,
    generatedAt: new Date().toISOString(),
    assets,
    texts,
  };

  // 기타 요소가 있으면 포함
  if (others.length > 0) {
    result.others = others;
  }

  writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");
  console.log(`\n📄 레이아웃 JSON 저장: ${outputPath}`);
  return outputPath;
}

/* ===================================================================
   8. 요약 출력
   =================================================================== */

function printSummary(assets, texts) {
  console.log("\n════════════════════════════════════════");
  console.log("  Figma Parser — 결과 요약");
  console.log("════════════════════════════════════════");
  console.log(`  캔버스: ${CANVAS_WIDTH} × ${CANVAS_HEIGHT}px`);
  console.log(`  접두사: ${PREFIX}`);
  console.log(`  에셋:   ${assets.length}개`);
  console.log(`  텍스트: ${texts.length}개`);

  if (assets.length > 0) {
    console.log("\n  ── 에셋 목록 ──");
    for (const a of assets) {
      console.log(`  ${a.file}  center(${a.center.x}%, ${a.center.y}%)  rotate(${a.rotate}deg)`);
    }
  }

  if (texts.length > 0) {
    console.log("\n  ── 텍스트 목록 ──");
    for (const t of texts) {
      const label = t.content.length > 30 ? t.content.slice(0, 30) + "…" : t.content;
      console.log(`  "${label}"  center(${t.center.x}%, ${t.center.y}%)  font(${t.fontFamily || "?"})`);
    }
  }

  console.log("════════════════════════════════════════\n");
}

/* ===================================================================
   메인 실행
   =================================================================== */

function main() {
  const input = readInput();
  console.log(`📖 입력 크기: ${(input.length / 1024).toFixed(1)} KB`);

  // 1) 에셋 URL 맵 구축
  const urlMap = extractAssetUrls(input);
  console.log(`🔗 에셋 URL 발견: ${urlMap.size}개`);

  // 2) JSX 요소 분리 및 파싱
  const elements = splitElements(input);
  console.log(`🧩 JSX 요소 발견: ${elements.length}개`);

  const assets = [];
  const texts = [];
  const others = [];

  for (const el of elements) {
    const result = parseElement(el, urlMap);
    if (!result) continue;

    if (result.kind === "asset") assets.push(result.data);
    else if (result.kind === "text") texts.push(result.data);
    else others.push(result.data);
  }

  // 3) 에셋 다운로드
  if (assets.length > 0) {
    downloadAssets(assets);
  }

  // 4) JSON 출력
  const outputPath = writeOutput(assets, texts, others);

  // 5) 요약
  printSummary(assets, texts);
}

main();
