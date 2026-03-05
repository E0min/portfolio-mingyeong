"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "./travel-zine.module.css";
import SectionNav from "@/components/home/shared/section-nav";

// 이미지 자원들을 컴포넌트 내부에서 응집도 있게 관리하기 위해 임포트합니다.
import detailBgImg from "../shared/assets/detail-bg.png"; // 배경 이미지 임포트
import centerPhotoImg from "./assets/center-photo.png"; // 중앙 메인 사진 이미지 임포트
import earthImg from "./assets/earth.png"; // 지구 이미지 임포트
import vmCircleImg from "./assets/vm-circle.svg"; // 뷰 모어 원형 SVG 임포트

export default function TravelZineDetail() {
  return (
    <div className={styles.page}>
      {/* ══════ 메인 카드 (Figma 402:475) ══════ */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ══════ 네비게이션 — 카드 내부 ══════ */}
        <SectionNav variant="detail" activeTab="Travel zine" />

        {/* ── 배경 이미지 (402:479) — opacity 60% ── */}
        <div className={styles.bgImg}>
          <Image src={detailBgImg} alt="" fill priority className="object-cover" sizes="100vw" />
        </div>

        {/* ── 다크 오버레이 (402:480) — 77% ── */}
        <div className={styles.overlay} />

        {/* ── "ZINE" 워터마크 (402:482) ── */}
        <p className={styles.zineText}>ZINE</p>

        {/* ── (archive) (402:481) ── */}
        <span className={styles.archive}>(archive)</span>

        {/* ══════ 좌측 텍스트 (Figma 402:489~497) ══════ */}
        <motion.div
          className={styles.leftBlock}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Travel zine 타이틀 (402:489 첫줄, Oswald Medium 30px) */}
          <p className={styles.txtTitle}>Travel zine</p>

          {/* Visual Travel Archive Platform */}
          <p className={styles.txtGreen18}>Visual Travel Archive Platform</p>

          {/* travel-zine.vercel.app (402:490, top=211) */}
          <p className={styles.txtGreen18} style={{ marginTop: "2.0vw" }}>
            travel-zine.vercel.app
          </p>

          {/* Travel Zine 라벨 (402:496, top=265) */}
          <p className={styles.txtGreen18} style={{ marginTop: "1.0vw" }}>
            Travel Zine
          </p>

          {/* 본문 설명 (402:489 body) */}
          <div className={styles.txtBody} style={{ marginTop: "0.5vw" }}>
            <p>
              <span className={styles.green}>Travel Zine</span> 은 여행을 정보가 아닌 기록으로
              다루는 <span className={styles.green}>시각 아카이브 프로젝트</span>입니다.
            </p>
            <p>관광지나 추천 코스를 나열하는 대신,</p>
            <p>한 도시에서 마주한 장면과 감각을 이미지 중심으로 재구성했습니다.</p>
            <p>
              이 프로젝트는 여행을 <span className={styles.blue}>&lsquo;이동&rsquo;</span>이 아니라
            </p>
            <p>하나의 시선으로 바라본 시간의 기록으로 남기기 위해 시작되었습니다.</p>
            <p>여행은 지도 위의 위치가 아니라</p>
            <p>장면의 축적을 통해 기억됩니다.</p>
            <p>각 섹션은 여행을 설명하는 대신,</p>
            <p>이미지의 흐름 속에서 체험하도록 설계되었습니다.</p>
          </div>

          {/* Design Focus (402:495, top=535) */}
          <p className={styles.txtGreen18} style={{ marginTop: "1.5vw" }}>
            Design Focus
          </p>
          <ul className={styles.bullets}>
            <li>이미지 중심의 그리드 구조</li>
            <li>여백을 활용한 시각적 호흡 설계</li>
            <li>텍스트 최소화 전략</li>
            <li>
              <span className={styles.green}>Zine</span>형식의 편집적 레이아웃 구성
            </li>
          </ul>

          {/* Structure (402:494, top=724) */}
          <p className={styles.txtGreen18} style={{ marginTop: "1.5vw" }}>
            Structure
          </p>
          <ul className={styles.bullets}>
            <li>Hero Section</li>
            <li>About</li>
            <li>Archive Grid</li>
            <li>Moments (Image Collection)</li>
            <li>Visual Composition Section</li>
            <li>Closing Frame</li>
          </ul>
        </motion.div>

        {/* ══════ 중앙 사진 (Figma 402:485 — 946×673) ══════ */}
        <motion.div
          className={styles.centerPhoto}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Image
            src={centerPhotoImg}
            alt="Travel Zine 프로젝트 메인 이미지"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 50vw"
          />
        </motion.div>

        {/* ══════ 지구 이미지 (Figma 402:514 — 297×297) ══════ */}
        <div className={styles.earthImg}>
          <Image src={earthImg} alt="" fill className="object-cover" sizes="15vw" />
        </div>

        {/* ══════ VIEW MORE (Figma 402:511~513) ══════ */}
        <a
          href="https://travel-zine.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewMore}
        >
          <img src={vmCircleImg.src} alt="" className={styles.vmCircle} />
          <span className={styles.vmText}>VIEW MORE</span>
        </a>

        {/* ══════ Typography 블록 (Figma 402:486~488, 402:492) ══════ */}
        <motion.div
          className={styles.typographyBlock}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className={styles.sectionLabel}>Typography</p>
          <p className={styles.rightBody}>
            <span className={styles.greenMedium}>OSWALD</span>와{" "}
            <span className={styles.greenMedium}>Bebas Neue</span>를 사용하여
            <br />
            강한 타이틀 중심 구조를 설계했습니다.
          </p>
        </motion.div>

        {/* ══════ Reflection 블록 (Figma 402:486 하단, 402:493) ══════ */}
        <motion.div
          className={styles.reflectionBlock}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <p className={styles.sectionLabel}>Reflection</p>
          <p className={styles.rightBody}>
            이 프로젝트는
            <br />
            여행을 추억하는 방법 중 하나로 시작되었습니다.
          </p>
          <p className={styles.rightBody} style={{ marginTop: "0.5em" }}>
            호주 누사(Noosa)에서 기록한 장면들을 다시 편집하고 재구성하며,
            <br />
            사진을 콜라주와 애니메이션으로 확장한 개인 작업입니다.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
