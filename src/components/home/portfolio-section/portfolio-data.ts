/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   포트폴리오 섹션 — 데이터 상수 + 타입
   WorksSection, NameCardsSection에서 추출
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// 포트폴리오 데이터에서 사용할 이미지 및 SVG 자원 임포트
import namecardCharacterImg from "./assets/namecard-character.png";
import dividerGreenSvg from "./assets/name-card-divider-green.svg";
import dividerBlueSvg from "./assets/name-card-divider-blue.svg";
import dividerPurpleSvg from "./assets/name-card-divider-purple.svg";
import dividerWhiteSvg from "./assets/name-card-divider-white.svg";

import meanCard1Img from "./assets/mean-card-1.png";
import meanCard2Img from "./assets/mean-card-2.png";
import meanRow2Img1 from "./assets/mean-row2-img1.png";
import meanRow2Img2 from "./assets/mean-row2-img2.png";
import meanRow2Img3 from "./assets/mean-row2-img3.png";
import meanRow2Img4 from "./assets/mean-row2-img4.png";
import meanRow2Img5 from "./assets/mean-row2-img5.png";

/* ── Travel Zine 산란 텍스트 (Figma 265:378~393) ──
   Figma 절대좌표를 컨테이너(1913×546, offset x=11, y=2419) 기준 %로 변환
   공식: left = (figmaX - 11) / 1913 * 100, top = (figmaY - 2419) / 546 * 100 */
export const scatteredLabels = [
  { text: "traVeL", left: "20.13%", top: "17.95%", size: 36 } /* 265:388 */,
  { text: "Ho", left: "4.72%", top: "46.15%", size: 36 } /* 265:389 */,
  { text: "me", left: "7.86%", top: "44.69%", size: 20 } /* 265:378 */,
  { text: "Zin", left: "26.89%", top: "46.15%", size: 36 } /* 265:390 */,
  { text: "e", left: "28.93%", top: "50.73%", size: 29 } /* 265:391 */,
  { text: "Stor", left: "41.70%", top: "42.49%", size: 36, rotate: 0.65 } /* 265:393 */,
  { text: "ies", left: "47.93%", top: "43.77%", size: 26, rotate: 0.65 } /* 265:380 */,
  { text: "Ab", left: "91.10%", top: "43.59%", size: 36 } /* 265:379 */,
  { text: "out", left: "93.24%", top: "43.04%", size: 29 } /* 265:392 */,
];

/* ── 바이닐 텍스트 (Figma 265:383~387) ── */
export const vinylTextLines = ["MEET", "THE 2026", "WEVSITES OF", "MEAN", "GIRS"];

/* ── 일본어 세로 텍스트 3열 (각 명함 카드 우하단) ──
   Figma 346:1429~1433 기준
   col1: ラジオ (가장 좌측)
   col2: 人生にキク (중간, 【】 브라켓 포함)
   col3: 逸れても道はある (가장 우측) */
export const verticalColumns = [
  { text: "ラジオ" } /* 좌측 열 */,
  { text: "人生に\u00A0キク", hasBrackets: true } /* 중간 열 — 【】 장식 */,
  { text: "逸れても道はある" } /* 우측 열 */,
];

/* ── 명함 카드 타입 (Figma 346:1422~1482 새 구조) ── */
export interface CardData {
  bg: string; /* 배경색 */
  overlayImage?: string; /* 반투명 오버레이 이미지 (초록 카드) */
  overlayOpacity?: number;
  overlayHeight?: string; /* 오버레이 높이 비율 (기본 100%) — Figma 기준 */
  overlayImageLeft?: string; /* 오버레이 이미지 left 오프셋 */
  overlayImageWidth?: string; /* 오버레이 이미지 너비 (부모 대비 %) */
  innerBorderColor?: string; /* 컬러 영역 내부 테두리 (흰 카드 초록 보더) */
  innerBorderWidth?: string;
  dividerSvg: string; /* 카드 하단 SVG 구분선 경로 */
  footerText: string; /* 카드 하단 정적 마키 텍스트 */
  footerFontWeight?: number; /* 카드별 푸터 폰트 굵기 (기본 CSS 값 사용) */
  footerFontSize?: string; /* 카드별 푸터 폰트 크기 (기본 CSS 값 사용) */
  quote?: { lines: string[]; font: string }; /* 카드 내 인용구 */
}

/* ── 카드별 고유 데이터 (Figma 그리드 순서: 좌상→우상→좌하→우하) ── */
export const cardsData: CardData[] = [
  {
    /* ── 좌상: 초록 카드 (Figma 346:1463 — 네임카드2) ── */
    bg: "#c0d746",
    overlayImage: namecardCharacterImg.src,
    overlayOpacity: 0.33,
    overlayHeight: "100%" /* 360.852 / 408.307 — 콘텐츠 하단 12%는 순수 배경 */,
    overlayImageLeft: "-6.69%" /* Figma: 이미지가 좌측으로 살짝 벗어남 */,
    overlayImageWidth: "116.44%" /* Figma: 컨테이너보다 16% 넓게 */,
    dividerSvg: dividerGreenSvg.src,
    footerText: "SOFTWARE ENGINEER . FRONT-END DEVELOPER . DEV",
    quote: {
      lines: [
        "기쁨은 지나고 나면 슬픔이 될때가 있다. 고통도 지나고 보면 성장이었고",
        "슬픔도 지나고 나면 너무나 인간적인 삶이었다.",
      ],
      font: "'Pretendard', sans-serif",
    },
  },
  {
    /* ── 우상: 파란 카드 (Figma 346:1442 — 네임카드3) ── */
    bg: "#4a6799",
    dividerSvg: dividerBlueSvg.src,
    footerText: "SOFTWARE ENGINEER . FRONT-END DEVELOPER . LYM",
    quote: {
      lines: [
        "Joy may turn into sorrow after it fades.",
        "Pain, in hindsight, was growth.",
        "And sorrow, in time, revealed a life that was profoundly human.",
      ],
      font: "'Pretendard', sans-serif",
    },
  },
  {
    /* ── 좌하: 보라 카드 (Figma 346:1422 — 네임카드4) ── */
    bg: "#b471cf",
    dividerSvg: dividerPurpleSvg.src,
    footerText: "SOFTWARE ENGINEER . FRONT-END DEVELOPER . DEV",
    quote: {
      lines: [
        "喜びは、過ぎ去ったあとに、悲しみに変わることがある。",
        "苦しみも、振り返ってみれば成長だった。",
        "悲しみも、過ぎてしまえば、とても人間らしい人生だった。",
      ],
      font: "var(--font-comfortaa), var(--font-noto-sans-jp), 'Comfortaa', 'Noto Sans JP', sans-serif",
    },
  },
  {
    /* ── 우하: 흰 카드 + 초록 보더 (Figma 346:1482 — 네임카드1) ── */
    bg: "white",
    innerBorderColor: "#8eb669",
    innerBorderWidth: "9.72px",
    dividerSvg: dividerWhiteSvg.src,
    footerText: "SOFTWARE ENGINEER . FRONT-END DEVELOPER . DEV . LYM",
    footerFontWeight: 500 /* Figma 346:1502: Comfortaa Medium */,
    footerFontSize: "clamp(14px, 1.49vw, 29px)" /* Figma: 28.691px at 1920px */,
  },
];

/* ── Mean Card (상단 두 장 가로 나란히) ── */
export const meanCardData = [
  { src: meanCard1Img.src, alt: "MEAN 컴포지션 좌측" },
  { src: meanCard2Img.src, alt: "MEAN 컴포지션 우측" },
];

/* ── Book Society (Figma 401:379 + 401:403 부근 텍스트/이미지) ── */
export const bookSocietyTextLines = [
  "더 북 소사이어티는 출판을 매개로 서울에서 활동하는 컬렉티브입니다.",
  "\u00A0", // &nbsp;
  "2010년부터 미디어버스라는 이름으로 출판과 편집을 전개하며,",
  "전시와 프로젝트를 기획합니다.",
  "\u00A0",
  "한편, 더 북 소사이어티라는 이름의 서점 겸 프로젝트 스페이스를 운영하며 현대 미술,",
  "디자인 관련 국내외 도서를 판매하고 유통합니다.",
  "\u00A0",
  "블로그와 소셜 미디어(인스타그램, 페이스북, 트위터)에서 저희 행사와 소식을 열람할 수 있습니다.",
];

export const bookSocietyCoversTitlePrefix =
  "From the current issue Style · Culture · Music · Society · Beauty · ";
export const bookSocietyCoversTitleHighlight = "Life";

export const bookSocietyCoversData = [
  {
    src: meanRow2Img4.src,
    alt: "Life 잡지 (Faded)",
    label: "LIFE",
    lines: ["Adam Curtis feels how", "Britain feels"],
    isFaded: true,
  },
  {
    src: meanRow2Img4.src,
    alt: "Life 잡지",
    label: "LIFE",
    lines: ["Adam Curtis feels how", "Britain feels"],
  },
  {
    src: meanRow2Img1.src,
    alt: "Breaking cover",
    label: "LIFE",
    lines: ["Breaking the grass", "ceiling"],
  },
  {
    src: meanRow2Img2.src,
    alt: "The FACE 1",
    label: "LIFE",
    lines: ["THE FACE's guide to", "going out in the UK"],
  },
  {
    src: meanRow2Img3.src,
    alt: "The FACE 2",
    label: "LIFE",
    lines: ["THE FACE's guide to", "going out in the UK"],
  },
  {
    src: meanRow2Img5.src,
    alt: "Whalley cover",
    label: "LIFE",
    lines: ["WHalley: is thi", "seshiest villag"],
  },
];
