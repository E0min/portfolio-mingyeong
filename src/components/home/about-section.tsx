"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import styles from "@/app/home.module.css";
import SectionNav from "./shared/section-nav";
import SectionBar from "./shared/section-bar";

// 이미지 및 SVG 자산 임포트
import about1Img from "./assets/about-1.png";
import about2Img from "./assets/about-2.png";
import about3Img from "./assets/about-3.png";
import about4Img from "./assets/about-4.png";
import about5Img from "./assets/about-5.png";
import about6Img from "./assets/about-6.png";
import about7Img from "./assets/about-7.png";
import about8Img from "./assets/about-8.png";
import aboutDotsSvg from "./assets/about-dots.svg";

/* ── 키워드 ↔ 사진 매핑 ID ── */
type KeywordId =
  | "film" /* 영화 */
  | "structure" /* 시각적 구조 */
  | "platform" /* 디지털 플랫폼 */
  | "curation" /* 큐레이션 기반의 웹사이트 */
  | "magazine" /* 매거진 형식의 인터페이스 */
  | "namecard"; /* 명함·비주얼 */

/* ── 사진 콜라주 데이터 ── */
interface PhotoItem {
  src: any;
  alt: string;
  figmaW: number;
  figmaH: number;
  left: string;
  top: string;
  width: string;
  zIndex: number;
  rotate: number;
  keywordId: KeywordId | null;
}

const photos: PhotoItem[] = [
  {
    src: about1Img,
    alt: "큐레이션 기반의 웹사이트 디자인",
    figmaW: 469,
    figmaH: 392,
    left: "6.7%",
    top: "3.3%",
    width: "71.4%",
    zIndex: 1,
    rotate: -1.5,
    keywordId: "curation",
  },
  {
    src: about2Img,
    alt: "매거진 형식의 인터페이스 디자인",
    figmaW: 451,
    figmaH: 455,
    left: "6.8%",
    top: "0%",
    width: "68.6%",
    zIndex: 2,
    rotate: 1.2,
    keywordId: "magazine",
  },
  {
    src: about3Img,
    alt: "에디토리얼 디자인 작업",
    figmaW: 560,
    figmaH: 381,
    left: "6.7%",
    top: "6.4%",
    width: "85.2%",
    zIndex: 3,
    rotate: -0.8,
    keywordId: "platform",
  },
  {
    src: about4Img,
    alt: "시각적 구조와 레이아웃",
    figmaW: 567,
    figmaH: 282,
    left: "11.0%",
    top: "11.2%",
    width: "86.3%",
    zIndex: 4,
    rotate: 0.5,
    keywordId: "structure",
  },
  {
    src: about5Img,
    alt: "명함 및 비주얼 아이덴티티 디자인",
    figmaW: 490,
    figmaH: 381,
    left: "15.2%",
    top: "11.9%",
    width: "74.6%",
    zIndex: 5,
    rotate: -1.0,
    keywordId: "namecard",
  },
  {
    src: about6Img,
    alt: "큐레이션 기반 웹사이트 — 트래블 진",
    figmaW: 573,
    figmaH: 295,
    left: "0%",
    top: "3.5%",
    width: "87.2%",
    zIndex: 6,
    rotate: 0.8,
    keywordId: null,
  },
  {
    src: about7Img,
    alt: "명함 · 비주얼 아이덴티티",
    figmaW: 574,
    figmaH: 304,
    left: "12.6%",
    top: "6.6%",
    width: "87.4%",
    zIndex: 7,
    rotate: -0.5,
    keywordId: null,
  },
  {
    src: about8Img,
    alt: "영화와 스토리텔링",
    figmaW: 448,
    figmaH: 320,
    left: "10.7%",
    top: "10.8%",
    width: "68.2%",
    zIndex: 8,
    rotate: 0.3,
    keywordId: "film",
  },
];

const sectionLabels = [
  { text: "[1]", left: "35.5%", top: "35.2%" },
  { text: "[2]", left: "31.7%", top: "51.3%" },
  { text: "[3]", left: "34.3%", top: "64.4%" },
  { text: "[4]", left: "33.6%", top: "79.0%" },
];

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
        cursor: "pointer",
        transition: "text-shadow 0.3s ease",
        textShadow: isActive ? "0 0 8px rgba(220, 250, 219, 0.5)" : "none",
      }}
    >
      {children}
    </span>
  );
}

export default function AboutSection() {
  const [hoveredKeyword, setHoveredKeyword] = useState<KeywordId | null>(null);

  return (
    <section id="about" className={styles.about}>
      <SectionNav />

      <div className={`${styles.decorBorder} ${styles.decorBorderLeft}`}>
        <Image src={aboutDotsSvg} alt="" fill className="object-contain" />
      </div>

      <div className={`${styles.decorBorder} ${styles.decorBorderRight}`}>
        <Image src={aboutDotsSvg} alt="" fill className="object-contain" />
      </div>

      {sectionLabels.map((label, i) => (
        <span
          key={`label-${i}`}
          className={styles.aboutLabel}
          style={{ left: label.left, top: label.top }}
        >
          {label.text}
        </span>
      ))}

      <span className={styles.aboutLabel} style={{ left: "68.7%", top: "61.5%" }}>
        (archive)
      </span>

      <div className={styles.aboutGrid}>
        <div className={styles.aboutPhotos}>
          {photos.map((photo, index) => {
            const isHighlighted = hoveredKeyword !== null && photo.keywordId === hoveredKeyword;

            return (
              <motion.div
                key={index}
                className={styles.photoFrame}
                style={{
                  left: photo.left,
                  top: photo.top,
                  zIndex: isHighlighted ? 100 : photo.zIndex,
                  width: photo.width,
                  aspectRatio: `${photo.figmaW} / ${photo.figmaH}`,
                }}
                initial={{ opacity: 0, scale: 0.9, rotate: photo.rotate }}
                whileInView={{ opacity: 1, scale: 1, rotate: photo.rotate }}
                viewport={{ once: true, amount: 0.2 }}
                animate={{
                  scale: isHighlighted ? 1.06 : 1,
                  rotate: isHighlighted ? 0 : photo.rotate,
                  opacity: hoveredKeyword === null ? 1 : isHighlighted ? 1 : 0.45,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.figmaW}
                  height={photo.figmaH}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            );
          })}
        </div>

        <div className={styles.aboutText}>
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

          <motion.div
            className={styles.bioEn}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p>
              I am a designer who builds visual structures and experiences rooted in film and{" "}
              <span style={{ color: "#1a7fa0", textDecoration: "underline" }}>
                editorial storytelling.
              </span>
            </p>
            <p>
              I value context and narrative flow, and develop digital platforms and content-driven
              visual systems inspired by film, culture, and publishing.
            </p>
            <p>
              Through typography, layout, and the rhythm of the screen, I explore how ideas evolve
              into atmosphere and story.
            </p>
            <p>
              Beyond curation-based websites and magazine-style interfaces, I also work on
              print-based graphic design such as business cards and visual identities.
            </p>
            <p>
              I carefully consider structure and density according to each medium, ensuring that
              every project carries its own distinct character and sensibility.
            </p>
            <p>
              My work connects{" "}
              <span style={{ color: "#1a7fa0", textDecoration: "underline" }}>UI/UX design</span>{" "}
              with editorial thinking, striving for a balance between aesthetics and usability,
              concept and structure.
            </p>
            <p>I am open to projects and collaborations related to culture, film, and branding.</p>
          </motion.div>

          <motion.div
            className={styles.bioKr}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p>
              저는{" "}
              <GreenSpan id="film" onHover={setHoveredKeyword} isActive={hoveredKeyword === "film"}>
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
              콘텐츠의 맥락과 흐름을 중요하게 생각하며, 영화·문화·출판을 기반으로 한{" "}
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
              타이포그래피와 레이아웃, 화면의 리듬을 통해 아이디어가 하나의 분위기와 서사로 완성되는
              과정을 탐구합니다.
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
              매체의 특성에 맞는 구조와 밀도를 고민하며, 각 프로젝트가 고유한 성격과 감도를 가질 수
              있도록 설계합니다. 저의 작업은{" "}
              <span style={{ color: "var(--home-text-light)" }}>
                UI/UX 디자인과 에디토리얼 사고
              </span>
              를 연결하며, 미적 감각과 사용성, 개념과 구조 사이의{" "}
              <span style={{ color: "var(--home-text-light)" }}>균형</span>을 지향합니다.
            </p>
            <p>문화·영화·브랜딩 관련 프로젝트 및 협업에 열려 있습니다.</p>
          </motion.div>
        </div>
      </div>

      <SectionBar variant="email" />
    </section>
  );
}
