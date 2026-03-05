"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "@/app/home.module.css";

// 이미지 및 SVG 자산 임포트
import heroBgImg from "./assets/hero-bg.png";
import heroMangaThumbImg from "./assets/hero-manga-thumb.png";

import heroLine1Svg from "./assets/hero-line-1.svg";
import heroLine2Svg from "./assets/hero-line-2.svg";
import heroLine3Svg from "./assets/hero-line-3.svg";
import heroLine4Svg from "./assets/hero-line-4.svg";
import heroLine5Svg from "./assets/hero-line-5.svg";
import heroLine6Svg from "./assets/hero-line-6.svg";

/* ── 산란 텍스트 타입 정의 ── */
interface ScatteredText {
  text: string;
  centerX: string; /* 바운딩 박스 중심 X (%) — translate(-50%) 적용 */
  centerY: string; /* 바운딩 박스 중심 Y (%) — translate(-50%) 적용 */
  fontSize: string;
  color: string;
  fontWeight: number;
  rotate: number;
  fontFamily?: string;
  letterSpacing?: string;
  skew?: number;
}

/* ── 산란 텍스트 데이터 ──
   Figma 265:97 노드 기준 — 바운딩 박스 중심점(%) 사용
   Figma는 회전된 텍스트를 바운딩 박스 중심에 배치 → CSS translate(-50%,-50%)로 재현
   centerX = (bbox.left + bbox.width/2) / 1920 × 100
   centerY = (bbox.top + bbox.height/2) / 1056 × 100 */
const scatteredTexts: ScatteredText[] = [
  {
    /* "MIN\nGYEONG" — bbox(51, 21, 486×288) → center(294, 165) */
    text: "MIN\nGYEONG",
    centerX: "15.31%",
    centerY: "15.61%",
    fontSize: "clamp(48px, 6.25vw, 120px)",
    color: "white",
    fontWeight: 400,
    rotate: 0.21,
  },
  {
    /* "photography" — bbox(791, 113, 688×146) → center(1135, 186) */
    text: "photography",
    centerX: "59.10%",
    centerY: "17.59%",
    fontSize: "clamp(48px, 6.25vw, 120px)",
    color: "#d1d5df",
    fontWeight: 400,
    rotate: 0.21,
  },
  {
    /* "MEANGIRLS" — bbox(614, 309, 660×145) → center(944, 382) */
    text: "MEANGIRLS",
    centerX: "49.15%",
    centerY: "36.15%",
    fontSize: "clamp(48px, 6.25vw, 120px)",
    color: "#d1d5df",
    fontWeight: 400,
    rotate: 0.21,
  },
  {
    /* "ART WORKS" — bbox(37, 362, 556×344) → center(315, 534) ★24.1° 회전 */
    text: "ART WORKS",
    centerX: "16.40%",
    centerY: "50.58%",
    fontSize: "clamp(44px, 5.73vw, 110px)",
    color: "#d1d5df",
    fontWeight: 400,
    rotate: 24.1,
    letterSpacing: "-7.7px",
  },
  {
    /* "DESINGER" — bbox(1256, 457, 292×137) → center(1402, 526) ★13.71° 회전 */
    text: "DESINGER",
    centerX: "73.02%",
    centerY: "49.76%",
    fontSize: "clamp(28px, 3.13vw, 60px)",
    color: "rgba(209, 213, 223, 0.85)",
    fontWeight: 400,
    rotate: 13.71,
  },
  {
    /* "logodesign" — bbox(547, 665, 583×145) → center(838, 738) */
    text: "logodesign",
    centerX: "43.67%",
    centerY: "69.85%",
    fontSize: "clamp(48px, 6.25vw, 120px)",
    color: "#d1d5df",
    fontWeight: 300,
    rotate: 0.21,
  },
  {
    /* "editorial" — bbox(1113, 841, 423×145) → center(1324, 913) */
    text: "editorial",
    centerX: "68.98%",
    centerY: "86.48%",
    fontSize: "clamp(48px, 6.25vw, 120px)",
    color: "#d1d5df",
    fontWeight: 300,
    rotate: 0.21,
  },
  {
    /* "motion" — bbox(26, 814, 248×97) → center(150, 863) */
    text: "motion",
    centerX: "7.81%",
    centerY: "81.68%",
    fontSize: "clamp(32px, 4.17vw, 80px)",
    color: "#d1d5df",
    fontWeight: 400,
    rotate: 0.47,
  },
  {
    /* "illustration" (1) — 약 50px 텍스트, -7.19° 회전, 추정 center */
    text: "illustration",
    centerX: "23.53%",
    centerY: "31.43%",
    fontSize: "clamp(24px, 2.6vw, 50px)",
    color: "#d1d5df",
    fontWeight: 400,
    rotate: -7.19,
    skew: -0.21,
  },
  {
    /* "illustration" (2) — 약 50px 텍스트, -3.88° 회전, 추정 center */
    text: "illustration",
    centerX: "15.11%",
    centerY: "67.52%",
    fontSize: "clamp(24px, 2.6vw, 50px)",
    color: "#d1d5df",
    fontWeight: 400,
    rotate: -3.88,
    skew: -0.21,
  },
  {
    /* "WRITER" — bbox(1678, 842, 239×231) → center(1798, 958) ★-43.09° 회전 */
    text: "WRITER",
    centerX: "93.63%",
    centerY: "90.69%",
    fontSize: "clamp(32px, 3.65vw, 70px)",
    color: "#31aace",
    fontWeight: 400,
    rotate: -43.09,
  },
  {
    /* "branding" — 약 50px 텍스트, -3.88° 회전, 추정 center */
    text: "branding",
    centerX: "86.70%",
    centerY: "83.46%",
    fontSize: "clamp(24px, 2.6vw, 50px)",
    color: "#d1d5df",
    fontWeight: 400,
    rotate: -3.88,
    skew: -0.21,
  },
  {
    /* "Etc..." — bbox(450, 1008, 144×80) → center(522, 1048) */
    text: "Etc...",
    centerX: "27.19%",
    centerY: "99.23%",
    fontSize: "clamp(28px, 3.39vw, 65px)",
    color: "#d1d5df",
    fontWeight: 400,
    rotate: 0.71,
  },
];

/* ── CREATIve 바운딩 박스 중심 (scatteredTexts 밖이므로 별도 정의)
   bbox(1607, 78.35, 214×863) → center(1714, 510) ── */
const CREATIVE_POS = { left: 89.28, top: 48.27 };

/* ── 장식 벡터 라인 데이터 ──
   Figma 265:97 노드에서 추출한 실제 SVG 파일 사용
   각 라인의 바운딩 박스 중심 좌표를 Figma 래퍼에서 직접 계산:
   centerX = (wrapperLeft + wrapperWidth/2) / 1920 × 100
   centerY = (wrapperTop + wrapperHeight/2) / 1056 × 100
   SVG 내부에 미세한 슬로프가 있어 CSS div보다 정확한 렌더링 */
const vectorLines = [
  {
    /* Vector 301 (265:109, 그룹 273:662)
       photography 위 상단 가로선
       wrapper: left=849, top=45.44, w=580.865, h=40.615
       center: (1139.43, 65.75) → (59.35%, 6.23%)
       내부 SVG: 581.532×6.066px, stroke-width=6 */
    svg: heroLine3Svg.src,
    centerX: 59.35,
    centerY: 6.23,
    width: 581.532 /* SVG 원본 너비 (px) */,
    height: 6.066 /* SVG 원본 높이 (px) */,
    rotate: -3.41,
  },
  {
    /* Vector 299 (265:106, 그룹 273:661)
       MEANGIRLS 위 가로선
       wrapper: left=605.89, top=262.95, w=824.22, h=46.098
       center: (1018.0, 286.0) → (53.02%, 27.08%)
       내부 SVG: 824×20px, stroke-width=6 */
    svg: heroLine1Svg.src,
    centerX: 53.02,
    centerY: 27.08,
    width: 824,
    height: 20,
    rotate: -1.82,
  },
  {
    /* Vector 302 (265:107, 그룹 273:660)
       ART WORKS 대각선 (흰색)
       wrapper: left=124, top=361, w=458.878, h=236.318
       center: (353.44, 479.16) → (18.41%, 45.37%)
       내부 SVG: 506.306×12.289px, stroke-width=6 */
    svg: heroLine4Svg.src,
    centerX: 18.41,
    centerY: 45.37,
    width: 506.306,
    height: 12.289,
    rotate: 26.42,
  },
  {
    /* Vector 303 (265:108, 그룹 274:664)
       CREATIve 왼쪽 세로선
       wrapper: left=1572.23, top=99.8, w=52.77, h=706.165
       center: (1598.62, 452.88) → (83.26%, 42.89%)
       내부 SVG: 705.551×30.641px, stroke-width=8 (두꺼운 선) */
    svg: heroLine5Svg.src,
    centerX: 83.26,
    centerY: 42.89,
    width: 705.551,
    height: 30.641,
    rotate: 88.2,
  },
  {
    /* Vector 300 (265:110, 그룹 274:665)
       editorial 위 대각선
       wrapper: left=994, top=782, w=254.761, h=169.382
       center: (1121.38, 866.69) → (58.41%, 82.07%)
       내부 SVG: 287.837×20px, stroke-width=6 */
    svg: heroLine2Svg.src,
    centerX: 58.41,
    centerY: 82.07,
    width: 287.837,
    height: 20,
    rotate: -31.97,
  },
  {
    /* Vector 304 (265:111, 그룹 274:666)
       logodesign 아래 대각선
       wrapper: left=332, top=855, w=282.342, h=97.915
       center: (473.17, 903.96) → (24.64%, 85.60%)
       내부 SVG: 287.837×20px, stroke-width=6 */
    svg: heroLine6Svg.src,
    centerX: 24.64,
    centerY: 85.6,
    width: 287.837,
    height: 20,
    rotate: 15.86,
  },
];

/* ── 일본어 세로 텍스트 (히어로 우측) ──
   Figma: left 1837/1795/1757px → %로 변환 */
const japaneseVertical = [
  { text: "逸れて도道はある", left: "95.68%", top: "28.31%" },
  { text: "人生에キク", left: "93.49%", top: "28.5%" },
  { text: "ラジオ", left: "91.51%", top: "28.31%" },
];

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* ── 배경 이미지 + 오버레이 ── */}
      <div className={styles.heroBg}>
        <Image
          src={heroBgImg}
          alt="만화 일러스트 배경"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* ── 히어로 콘텐츠 (산란 텍스트 + 장식) ── */}
      <div className={styles.heroContent}>
        {/* ── CREATIve (세로 배치) ──
           bbox(1607, 78.35, 214×863) → center(1714, 510) = (89.28%, 48.27%)
           C/R/E/A/T 각각 한 줄, "Ive"는 한 줄로 합쳐서 표시
           translate(-50%,-50%)로 바운딩 박스 중심 기준 배치 */}
        <div
          style={{
            position: "absolute",
            left: `${CREATIVE_POS.left}%`,
            top: `${CREATIVE_POS.top}%`,
            transform: "translate(-50%, -50%)" /* 중심점 기준 배치 */,
          }}
        >
          <motion.div
            style={{
              fontSize: "clamp(48px, 6.25vw, 120px)",
              color: "#d1d5df",
              fontFamily: "Pretendard, sans-serif",
              lineHeight: "85.45%" /* 글자 간 밀착 */,
              letterSpacing: "-1.2px",
              whiteSpace: "nowrap",
              rotate: "-4.02deg" /* Figma 회전값 */,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* C, R, E, A, T 각각 별도 줄 + "Ive" 한 줄 (Figma 265:122) */}
            {["C", "R", "E", "A", "T", "Ive"].map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </motion.div>
        </div>

        {/* ── 박민경 (비래퍼 요소 — Figma에서 직접 배치)
           left=548px → 28.54%, top=68px → 6.44%
           Pretendard 67px, Figma 노드 265:98 */}
        <motion.p
          className={styles.scatteredText}
          style={{
            left: "28.54%",
            top: "6.44%",
            fontSize: "clamp(32px, 3.49vw, 67px)",
            color: "#d1d5df",
            fontWeight: 400,
            fontFamily: "Pretendard, sans-serif",
            rotate: "0.21deg",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          박민경
        </motion.p>

        {/* ── 산란 텍스트 (stagger 애니메이션) ──
           바운딩 박스 중심 기준 배치:
           wrapper div → translate(-50%,-50%)로 중심 정렬
           inner motion.p → 회전 + 애니메이션 */}
        {scatteredTexts.map((item, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: item.centerX /* 바운딩 박스 중심 X */,
              top: item.centerY /* 바운딩 박스 중심 Y */,
              transform: "translate(-50%, -50%)" /* 중심점 기준 배치 */,
            }}
          >
            <motion.p
              style={{
                fontSize: item.fontSize,
                color: item.color,
                fontWeight: item.fontWeight,
                fontFamily: item.fontFamily || "Pretendard, sans-serif",
                letterSpacing: item.letterSpacing,
                whiteSpace: "nowrap",
                lineHeight: "normal",
                rotate: `${item.rotate}deg`,
                ...(item.skew ? { skewX: `${item.skew}deg` } : {}),
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + index * 0.05,
                ease: "easeOut",
              }}
            >
              {item.text.includes("\n")
                ? item.text.split("\n").map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))
                : item.text}
            </motion.p>
          </div>
        ))}

        {/* ── 장식 벡터 라인 (실제 Figma SVG 사용) ──
           Figma 바운딩 박스 중심 좌표에 배치
           Framer Motion x/y로 센터링 + rotate로 회전 (transform 충돌 방지)
           SVG는 preserveAspectRatio="none"으로 컨테이너에 맞춰 늘어남 */}
        {vectorLines.map((line, i) => (
          <motion.div
            key={`vec-${i}`}
            style={{
              position: "absolute",
              left: `${line.centerX}%` /* 바운딩 박스 중심 X */,
              top: `${line.centerY}%` /* 바운딩 박스 중심 Y */,
              /* SVG 원본 크기를 뷰포트 비율로 스케일링 */
              width: `${(line.width / 1920) * 100}%`,
              height: `${(line.height / 1056) * 100}%`,
              x: "-50%" /* Framer Motion: 자신 너비의 -50% */,
              y: "-50%" /* Framer Motion: 자신 높이의 -50% */,
              rotate: line.rotate /* Framer Motion: 회전 (deg) */,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={line.svg}
              alt=""
              style={{
                width: "100%" /* 컨테이너 전체 채움 */,
                height: "100%",
                display: "block" /* 하단 여백 제거 */,
              }}
            />
          </motion.div>
        ))}

        {/* ── 일본어 세로 텍스트 ──
           Figma: 각 글자를 <p>로 쌓아 세로 배치 (writing-mode 미사용)
           폰트: Comfortaa + Noto Sans JP */}
        {japaneseVertical.map((item, i) => (
          <motion.div
            key={`ja-${i}`}
            style={{
              position: "absolute",
              left: item.left,
              top: item.top,
              fontSize: "30px",
              fontFamily:
                "var(--font-comfortaa), var(--font-noto-sans-jp), Comfortaa, Noto Sans JP, sans-serif",
              color: "#d1d5df",
              lineHeight: "normal",
              whiteSpace: "nowrap",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 + i * 0.15 }}
          >
            {/* 블록 <p>로 각 글자를 세로 쌓기 */}
            {item.text.split("").map((char, j) => (
              <p key={j} className="m-0">
                {char}
              </p>
            ))}
          </motion.div>
        ))}

        {/* ── 일본어 꺾쇠 괄호 【 (세로 텍스트 사이 장식) ──
           Figma 265:127 — left 1794px → 93.44%, top 401px → 37.97%, rotate 90°
           Figma 265:128 — left 1804px → 93.96%, top 508px → 48.11%, rotate -90° + flipY */}
        <motion.span
          style={{
            position: "absolute",
            left: "93.44%",
            top: "37.97%",
            fontSize: "30px",
            fontFamily:
              "var(--font-comfortaa), var(--font-noto-sans-jp), Comfortaa, Noto Sans JP, sans-serif",
            color: "#d1d5df",
            letterSpacing: "-20.4px",
            rotate: "90deg",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          【
        </motion.span>
        <motion.span
          style={{
            position: "absolute",
            left: "93.96%",
            top: "48.11%",
            fontSize: "30px",
            fontFamily:
              "var(--font-comfortaa), var(--font-noto-sans-jp), Comfortaa, Noto Sans JP, sans-serif",
            color: "#d1d5df",
            letterSpacing: "-20.4px",
            rotate: "-90deg",
            scaleY: -1 /* Figma: -scale-y-100 (상하 반전) */,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.35 }}
        >
          【
        </motion.span>

        {/* ── 일본어 인용구 (히어로 중앙) ──
           Figma: left 574px → 29.9%, top 435px → 41.19% */}
        <motion.div
          className="absolute text-[11px]"
          style={{
            left: "29.9%",
            top: "41.19%",
            fontFamily:
              "var(--font-comfortaa), var(--font-noto-sans-jp), Comfortaa, Noto Sans JP, sans-serif",
            color: "#d1d5df",
            lineHeight: "normal",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <p>喜び는, 過ぎ去ったあとに, 悲しみに変わることがある。</p>
          <p>苦しみ도, 振り返ってみれば成長だった。</p>
          <p>悲しみ도, 過ぎてしまえば, とても人間らしい人生だった。</p>
        </motion.div>

        {/* ── 영어 인용구 ──
           Figma: left 517px → 26.93%, top 815px → 77.18% */}
        <motion.div
          className="absolute text-[11px] text-black"
          style={{
            left: "26.93%",
            top: "77.18%",
            fontFamily: "Pretendard, sans-serif",
            lineHeight: "normal",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p>Joy may turn into sorrow after it fades.</p>
          <p>Pain, in hindsight, was growth.</p>
          <p>And sorrow, in time, revealed a life that was profoundly human.</p>
        </motion.div>

        {/* ── Hellooooo (좌하단, 핑크) ──
           Figma: left 29px → 1.51%, top 916px → 86.74% */}
        <motion.div
          style={{
            position: "absolute",
            left: "1.51%",
            top: "86.74%",
            fontFamily: "var(--font-oswald), Oswald, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(24px, 2.34vw, 45px)",
            color: "#fddeff",
            lineHeight: 1.486,
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <p>Hellooooooooooooooo</p>
          <p>alsrud6339@gmail.com</p>
        </motion.div>

        {/* ── (coming soon) 라벨 ──
           Figma: left 1285px → 66.93%, top 725px → 68.66% */}
        <span
          className="absolute text-[18px]"
          style={{
            left: "66.93%",
            top: "68.66%",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            color: "rgba(209, 213, 223, 0.74)",
          }}
        >
          (coming soon)
        </span>

        {/* ── (archive) 라벨 ──
           Figma: left 1453px → 75.68%, top 569px → 53.88% */}
        <span
          className="absolute text-[18px]"
          style={{
            left: "75.68%",
            top: "53.88%",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            color: "rgba(209, 213, 223, 0.75)",
          }}
        >
          (archive)
        </span>

        {/* ── 작은 만화 이미지 ──
           Figma: left 624px → 32.5%, top 970px → 91.86% */}
        <motion.div
          className="absolute"
          style={{ left: "32.5%", top: "91.86%", width: 64, height: 68 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          <Image
            src={heroMangaThumbImg}
            alt="작은 만화 이미지"
            width={64}
            height={68}
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
