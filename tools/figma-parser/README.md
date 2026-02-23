# Figma MCP Design Context Parser

Figma MCP `get_design_context` 결과에서 에셋(SVG/PNG)과 레이아웃 정보를 자동 추출하는 CLI 스크립트.

## 사전 조건

- **Node.js** 18+ (외부 패키지 불필요)
- **Figma Desktop** 앱 실행 중 (localhost:3845 에셋 서버 필요)

## 사용법

### 파일에서 읽기

```bash
# 1) Figma MCP 결과를 파일로 저장
# 2) 스크립트 실행
node tools/figma-parser/index.mjs \
  --input figma-output.txt \
  --assets public/portfolio \
  --prefix hero
```

### 클립보드에서 파이프

```bash
pbpaste | node tools/figma-parser/index.mjs \
  --assets public/portfolio \
  --prefix hero
```

### 다운로드 없이 JSON만 생성

```bash
node tools/figma-parser/index.mjs \
  --input figma-output.txt \
  --prefix hero \
  --dry-run
```

## 옵션

| 옵션 | 기본값 | 설명 |
|:---|:---|:---|
| `--input <file>` | stdin | Figma MCP 출력 파일 경로 |
| `--assets <dir>` | `public/portfolio` | 에셋 다운로드 디렉토리 |
| `--prefix <name>` | `section` | 파일명 접두사 (예: hero, about) |
| `--canvas-width <px>` | `1920` | Figma 캔버스 너비 |
| `--canvas-height <px>` | `1056` | Figma 캔버스 높이 |
| `--dry-run` | false | 다운로드 건너뛰고 JSON만 생성 |

## 출력

### 1) 다운로드된 에셋

```
public/portfolio/hero-265-109.svg
public/portfolio/hero-265-106.svg
public/portfolio/hero-265-100.png
```

### 2) 레이아웃 JSON

`tools/figma-parser/output/{prefix}-layout.json`

```json
{
  "canvasWidth": 1920,
  "canvasHeight": 1056,
  "assets": [
    {
      "nodeId": "265:109",
      "type": "svg",
      "file": "hero-265-109.svg",
      "wrapper": { "left": 849, "top": 45.44, "width": 580.865, "height": 40.615 },
      "center": { "x": 59.35, "y": 6.23 },
      "rotate": -3.41,
      "inner": { "width": 581.532, "height": 6.066 }
    }
  ],
  "texts": [
    {
      "nodeId": "265:112",
      "content": "MEANGIRLS",
      "wrapper": { "left": "calc(50%-346px)", "top": 309, "width": 659.518, "height": 145.405 },
      "center": { "x": 49.15, "y": 36.15 },
      "rotate": 0.21,
      "fontSize": "120px",
      "color": "#d1d5df",
      "fontFamily": "Pretendard"
    }
  ]
}
```

## 파싱 대상

| 데이터 | 소스 패턴 |
|:---|:---|
| 에셋 URL | `const imgXxx = "http://localhost:3845/..."` |
| 위치 | `left-[Xpx]`, `top-[Xpx]`, `left-[calc(50%+Xpx)]` |
| 크기 | `w-[Xpx]`, `h-[Xpx]` |
| 회전 | `rotate-[Xdeg]`, `-rotate-[Xdeg]` |
| 노드 ID | `data-node-id="X:Y"` |
| 에셋 참조 | `src={imgVarName}` |
| 폰트 | `font-['FontName']`, `text-[Xpx]` |
| 색상 | `text-[#hex]`, `text-[rgba(...)]` |
