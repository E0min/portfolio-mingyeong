"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import styles from "@/app/home.module.css";
import SectionNav from "./shared/section-nav";
import SectionBar from "./shared/section-bar";

/* ── 키워드 ↔ 사진 매핑 ID ── */
type KeywordId =
  | "film"           /* 영화 */
  | "structure"      /* 시각적 구조 */
  | "platform"       /* 디지털 플랫폼 */
  | "curation"       /* 큐레이션 기반의 웹사이트 */
  | "magazine"       /* 매거진 형식의 인터페이스 */
  | "namecard";      /* 명함·비주얼 */

/* ── 사진 콜라주 데이터 ──
   Figma 355:1519 기준 — 부모 그룹 (x=26, y=1350, w=657, h=455)
   모든 좌표를 부모 기준 %로 변환: left=(x-26)/657, top=(y-1350)/455
   keywordId: 해당 사진을 활성화할 키워드 (null = 호버 연동 없음) */
interface PhotoItem {
  src: string;
  alt: string;
  figmaW: number;       /* Figma 원본 프레임 너비 (px) — aspect-ratio 계산용 */
  figmaH: number;       /* Figma 원본 프레임 높이 (px) */
  left: string;         /* 부모 기준 % */
  top: string;          /* 부모 기준 % */
  width: string;        /* 부모 기준 % */
  zIndex: number;       /* 기본 z-index (Figma 레이어 순서) */
  rotate: number;       /* 미세 회전 (deg) — 종이 더미 느낌 */
  keywordId: KeywordId | null;
}

/* 사진 콜라주 — Figma 355:1519 "문서 뭉치" 배치
   8장의 사진이 밀집 겹침 → 호버 시 해당 사진만 최상단으로 올라옴
   좌표: 부모 그룹(657×455) 기준 %로 변환 — 컨테이너 크기에 비례 스케일링 */
const photos: PhotoItem[] = [
  {
    /* image 1787 (346:1236) — 사막/영화 장면
       Frame: x=70, y=1365, w=469, h=392 */
    src: "/portfolio/about-photo-1.png",
    alt: "영화 촬영 현장 — 사막 배경",
    figmaW: 469, figmaH: 392,
    left: "6.7%",    /* (70-26)/657 */
    top: "3.3%",     /* (1365-1350)/455 */
    width: "71.4%",  /* 469/657 */
    zIndex: 1,
    rotate: -1.5,
    keywordId: "film",
  },
  {
    /* image 1792 (346:1241) — 세로 포트폴리오
       Frame: x=71, y=1350, w=451, h=455 */
    src: "/portfolio/about-photo-2.png",
    alt: "시각적 구조 — 포트폴리오",
    figmaW: 451, figmaH: 455,
    left: "6.8%",    /* (71-26)/657 */
    top: "0%",       /* (1350-1350)/455 */
    width: "68.6%",  /* 451/657 */
    zIndex: 2,
    rotate: 1.2,
    keywordId: "structure",
  },
  {
    /* image 1790 (346:1245) — 와이드 에디토리얼
       Frame: x=70, y=1379, w=560, h=381 */
    src: "/portfolio/about-photo-3.png",
    alt: "에디토리얼 디자인 작업",
    figmaW: 560, figmaH: 381,
    left: "6.7%",    /* (70-26)/657 */
    top: "6.4%",     /* (1379-1350)/455 */
    width: "85.2%",  /* 560/657 */
    zIndex: 3,
    rotate: -0.8,
    keywordId: "platform",
  },
  {
    /* image 1789 (346:1249) — 넓은 레이아웃
       Frame: x=98, y=1401, w=567, h=282 */
    src: "/portfolio/about-photo-4.png",
    alt: "디지털 플랫폼 디자인",
    figmaW: 567, figmaH: 282,
    left: "11.0%",   /* (98-26)/657 */
    top: "11.2%",    /* (1401-1350)/455 */
    width: "86.3%",  /* 567/657 */
    zIndex: 4,
    rotate: 0.5,
    keywordId: null,
  },
  {
    /* image 1788 (346:1252) — 매거진 형식
       Frame: x=126, y=1404, w=490, h=381 */
    src: "/portfolio/about-photo-5.png",
    alt: "매거진 형식의 인터페이스",
    figmaW: 490, figmaH: 381,
    left: "15.2%",   /* (126-26)/657 */
    top: "11.9%",    /* (1404-1350)/455 */
    width: "74.6%",  /* 490/657 */
    zIndex: 5,
    rotate: -1.0,
    keywordId: "magazine",
  },
  {
    /* image 1622 (346:1274) — 트래블 진 (흰 보더)
       Frame: x=26, y=1366, w=573, h=295 */
    src: "/portfolio/about-photo-6.png",
    alt: "큐레이션 기반 웹사이트 — 트래블 진",
    figmaW: 573, figmaH: 295,
    left: "0%",      /* (26-26)/657 */
    top: "3.5%",     /* (1366-1350)/455 */
    width: "87.2%",  /* 573/657 */
    zIndex: 6,
    rotate: 0.8,
    keywordId: "curation",
  },
  {
    /* image 1804 (346:1311) — 명함/비주얼 (다크 보더)
       Frame: x=109, y=1380, w=574, h=304 */
    src: "/portfolio/about-photo-7.png",
    alt: "명함 · 비주얼 아이덴티티",
    figmaW: 574, figmaH: 304,
    left: "12.6%",   /* (109-26)/657 */
    top: "6.6%",     /* (1380-1350)/455 */
    width: "87.4%",  /* 574/657 */
    zIndex: 7,
    rotate: -0.5,
    keywordId: "namecard",
  },
  {
    /* image 1791 (346:1376) — 최상단 사진
       Frame: x=96, y=1399, w=448, h=320 */
    src: "/portfolio/about-photo-8.png",
    alt: "디자인 작업물",
    figmaW: 448, figmaH: 320,
    left: "10.7%",   /* (96-26)/657 */
    top: "10.8%",    /* (1399-1350)/455 */
    width: "68.2%",  /* 448/657 */
    zIndex: 8,
    rotate: 0.3,
    keywordId: null,
  },
];

/* ── 섹션 내 주석 라벨 ──
   Figma 265:43 그룹 — 각 번호는 사진 콜라주 옆에 배치
   Figma 절대좌표를 섹션 기준 %로 변환 */
const sectionLabels = [
  { text: "[1]", left: "35.5%", top: "35.2%" },
  { text: "[2]", left: "31.7%", top: "51.3%" },
  { text: "[3]", left: "34.3%", top: "64.4%" },
  { text: "[4]", left: "33.6%", top: "79.0%" },
];

/* ── 호버 가능한 초록 키워드 span ── */
interface GreenSpanProps {
  id: KeywordId;
  children: React.ReactNode;
  onHover: (id: KeywordId | null) => void;
  isActive: boolean;
}

function GreenSpan({ id, children, onHover, isActive }: GreenSpanProps) {
  return (
    <span
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      style={{
        color: "var(--home-text-green)",
        fontWeight: 400,
        cursor: "pointer",                          /* 호버 커서 */
        transition: "text-shadow 0.3s ease",         /* 부드러운 전환 */
        textShadow: isActive
          ? "0 0 8px rgba(220, 250, 219, 0.5)"      /* 활성 시 글로우 */
          : "none",
      }}
    >
      {children}
    </span>
  );
}

export default function AboutSection() {
  /* 현재 호버 중인 키워드 ID (null = 아무것도 호버 안 됨) */
  const [hoveredKeyword, setHoveredKeyword] = useState<KeywordId | null>(null);
  /* 사이드 카드 펼침/접힘 상태 */
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <section id="about" className={styles.about}>
      {/* ── 인페이지 네비 (섹션 내부 상단 고정 — Figma 265:84) ── */}
      <SectionNav />

      {/* ── 좌측 점 장식 보더 (Figma 265:64) ── */}
      <div className={`${styles.decorBorder} ${styles.decorBorderLeft}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/portfolio/about-border-dots.svg"
          alt=""
          className="h-full w-full"
        />
      </div>

      {/* ── 우측 점 장식 보더 (Figma 265:51) ── */}
      <div className={`${styles.decorBorder} ${styles.decorBorderRight}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/portfolio/about-border-dots.svg"
          alt=""
          className="h-full w-full"
        />
      </div>

      {/* ── 섹션 번호 라벨 [1]~[4] ── */}
      {sectionLabels.map((label, i) => (
        <span
          key={`label-${i}`}
          className={styles.aboutLabel}
          style={{ left: label.left, top: label.top }}
        >
          {label.text}
        </span>
      ))}

      {/* ── (coming soon) / (archive) 라벨 ── */}
      <span
        className={styles.aboutLabel}
        style={{ left: "60.9%", top: "81.2%" }}
      >
        (coming soon)
      </span>
      <span
        className={styles.aboutLabel}
        style={{ left: "68.7%", top: "61.5%" }}
      >
        (archive)
      </span>

      {/* ── 2컬럼 그리드: 사진(좌) + 텍스트(우) ── */}
      <div className={styles.aboutGrid}>

      {/* ── 좌측: 사진 콜라주 (문서 뭉치) ──
          호버된 키워드에 매칭되는 사진만 z-index: 100으로 올림
          나머지 사진은 기본 z-index 유지 → 문서 더미처럼 겹침 */}
      <div className={styles.aboutPhotos}>
        {photos.map((photo, index) => {
          /* 이 사진이 현재 호버된 키워드에 매칭되는지 확인 */
          const isHighlighted =
            hoveredKeyword !== null && photo.keywordId === hoveredKeyword;

          return (
            <motion.div
              key={index}
              className={styles.photoFrame}
              style={{
                left: photo.left,
                top: photo.top,
                zIndex: isHighlighted ? 100 : photo.zIndex,
                width: photo.width,                        /* Figma 부모 기준 % */
                aspectRatio: `${photo.figmaW} / ${photo.figmaH}`, /* Figma 원본 비율 유지 */
              }}
              initial={{ opacity: 0, scale: 0.9, rotate: photo.rotate }}
              whileInView={{ opacity: 1, scale: 1, rotate: photo.rotate }}
              viewport={{ once: true, amount: 0.2 }}
              animate={{
                scale: isHighlighted ? 1.06 : 1,         /* 활성 시 약간 확대 */
                rotate: isHighlighted ? 0 : photo.rotate, /* 활성 시 회전 초기화 */
                opacity: hoveredKeyword === null
                  ? 1                                      /* 호버 없음: 전체 표시 */
                  : isHighlighted
                    ? 1                                    /* 매칭: 완전 불투명 */
                    : 0.45,                                /* 비매칭: 더 어둡게 */
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.figmaW}
                height={photo.figmaH}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        })}
      </div>

      {/* ── 우측: 소개 텍스트 + 사이드 카드 ── */}
      <div className={styles.aboutText} style={{ position: "relative" }}>
        {/* ── 인사말 (Figma 265:50) ── */}
        <motion.div
          className={styles.greeting}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p>Hellooooooooooooooo</p>
          <p>안녕하세요 박민경입니다!</p>
        </motion.div>

        {/* ── 영문 소개 (파란 강조) ── */}
        <motion.div
          className={styles.bioEn}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <p>
            I am a designer who builds visual structures and experiences rooted
            in film and{" "}
            <span style={{ color: "#1a7fa0", textDecoration: "underline" }}>
              editorial storytelling.
            </span>
          </p>
          <p>
            I value context and narrative flow, and develop digital platforms and
            content-driven visual systems inspired by film, culture, and
            publishing.
          </p>
          <p>
            Through typography, layout, and the rhythm of the screen, I explore
            how ideas evolve into atmosphere and story.
          </p>
          <p>
            Beyond curation-based websites and magazine-style interfaces, I also
            work on print-based graphic design such as business cards and visual
            identities.
          </p>
          <p>
            I carefully consider structure and density according to each medium,
            ensuring that every project carries its own distinct character and
            sensibility.
          </p>
          <p>
            My work connects{" "}
            <span style={{ color: "#1a7fa0", textDecoration: "underline" }}>
              UI/UX design
            </span>{" "}
            with editorial thinking, striving for a balance between aesthetics
            and usability, concept and structure.
          </p>
          <p>
            I am open to projects and collaborations related to culture, film,
            and branding.
          </p>
        </motion.div>

        {/* ── 한글 소개 (Figma 265:83 — 초록 키워드 호버 → 사진 활성화) ── */}
        <motion.div
          className={styles.bioKr}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>
            저는{" "}
            <GreenSpan
              id="film"
              onHover={setHoveredKeyword}
              isActive={hoveredKeyword === "film"}
            >
              영화
            </GreenSpan>
            와 에디토리얼 스토리텔링을 중심으로{" "}
            <GreenSpan
              id="structure"
              onHover={setHoveredKeyword}
              isActive={hoveredKeyword === "structure"}
            >
              시각적 구조
            </GreenSpan>
            와 경험을 설계하는 디자이너입니다.
          </p>
          <p>
            콘텐츠의 맥락과 흐름을 중요하게 생각하며, 영화·문화·출판을 기반으로
            한{" "}
            <GreenSpan
              id="platform"
              onHover={setHoveredKeyword}
              isActive={hoveredKeyword === "platform"}
            >
              디지털 플랫폼
            </GreenSpan>
            과 콘텐츠 중심의 비주얼 시스템을 구축합니다.
          </p>
          <p>
            타이포그래피와 레이아웃, 화면의 리듬을 통해 아이디어가 하나의 분위기와
            서사로 완성되는 과정을 탐구합니다.
          </p>
          <p>
            <GreenSpan
              id="curation"
              onHover={setHoveredKeyword}
              isActive={hoveredKeyword === "curation"}
            >
              큐레이션 기반의 웹사이트
            </GreenSpan>
            와{" "}
            <GreenSpan
              id="magazine"
              onHover={setHoveredKeyword}
              isActive={hoveredKeyword === "magazine"}
            >
              매거진 형식의 인터페이스
            </GreenSpan>
            뿐 아니라,{" "}
            <GreenSpan
              id="namecard"
              onHover={setHoveredKeyword}
              isActive={hoveredKeyword === "namecard"}
            >
              명함·비주얼
            </GreenSpan>{" "}
            아이덴티티 등 인쇄 기반 그래픽 디자인 작업도 함께 진행합니다.
          </p>
          <p>
            매체의 특성에 맞는 구조와 밀도를 고민하며, 각 프로젝트가 고유한 성격과
            감도를 가질 수 있도록 설계합니다. 저의 작업은{" "}
            <span style={{ color: "var(--home-text-light)" }}>
              UI/UX 디자인과 에디토리얼 사고
            </span>
            를 연결하며, 미적 감각과 사용성,
            개념과 구조 사이의{" "}
            <span style={{ color: "var(--home-text-light)" }}>균형</span>을
            지향합니다.
          </p>
          <p>문화·영화·브랜딩 관련 프로젝트 및 협업에 열려 있습니다.</p>
        </motion.div>

        {/* ── 사이드 카드: "Hi, I'm Mean Girl" (접이식) ──
           접힌 상태: 사진 + 작은 토글 화살표만 표시
           펼친 상태: 사진 + 소개 텍스트 + 프로젝트 링크 전체 표시 */}
        <motion.div
          className={styles.sideCard}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* 사진 영역 — 클릭 시 토글 */}
          <button
            type="button"
            onClick={() => setIsCardOpen((prev) => !prev)}
            className="w-full overflow-hidden relative cursor-pointer border-none p-0 bg-transparent block"
            style={{ aspectRatio: "1 / 1" }}  /* 정사각형 사진 영역 */
            aria-expanded={isCardOpen}
            aria-label={isCardOpen ? "카드 접기" : "카드 펼치기"}
          >
            <Image
              src="/portfolio/about-sidebar-photo.png"
              alt="프로필 사진"
              width={130}
              height={130}
              className="w-full h-full object-cover"
            />
            {/* 토글 화살표 */}
            <motion.span
              animate={{ rotate: isCardOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                bottom: "6px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: "rgba(0, 0, 0, 0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#d1d5df",
                fontSize: "10px",
                lineHeight: 1,
              }}
            >
              ▼
            </motion.span>
          </button>

          {/* 접이식 콘텐츠: 소개 텍스트 + 프로젝트 링크 */}
          <AnimatePresence initial={false}>
            {isCardOpen && (
              <motion.div
                key="card-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}  /* 접힐 때 넘침 방지 */
              >
                {/* 소개 텍스트 */}
                <div
                  className="p-2 text-[#d1d5df]"
                  style={{
                    fontFamily: "Pretendard, sans-serif",
                    fontWeight: 600,
                    fontSize: "12px",
                    lineHeight: 1.4,
                  }}
                >
                  <p>Hi, I&apos;m Mean Girl,</p>
                  <p>a designer from Korea</p>
                  <p className="mt-1 text-[10px]">
                    <span className="mr-2">mail</span>
                    <span>instagram</span>
                  </p>
                </div>

                {/* 프로젝트 링크 */}
                <div className="px-2 pb-2 flex flex-col">
                  <a
                    href="#works"
                    className="text-[14px] font-semibold"
                    style={{
                      color: "var(--home-text-purple)",
                      fontFamily: "Pretendard, sans-serif",
                    }}
                  >
                    Travel zine
                  </a>
                  <a
                    href="#namecards"
                    className="text-[14px] font-semibold"
                    style={{
                      color: "var(--home-text-purple)",
                      fontFamily: "Pretendard, sans-serif",
                    }}
                  >
                    Name Card
                  </a>
                  <a
                    href="#works"
                    className="text-[14px] font-semibold"
                    style={{
                      color: "var(--home-text-purple)",
                      fontFamily: "Pretendard, sans-serif",
                    }}
                  >
                    MeanGirls
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      </div>{/* /.aboutGrid */}

      {/* ── 섹션별 하단 고정 바 (About 섹션 범위 내에서만 sticky) ── */}
      <SectionBar variant="email" />
    </section>
  );
}
