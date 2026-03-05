"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./book-society.module.css";

// 이미지 자원들을 컴포넌트 내부에서 응집도 있게 관리하기 위해 임포트합니다.
import navCatImg from "../shared/assets/nav-cat-silhouette.png"; // 네비게이션 고양이 이미지 임포트
import detailBgImg from "../shared/assets/detail-bg.png"; // 배경 이미지 임포트
import detailPhotoImg from "./assets/detail-photo.png"; // 상세 페이지 메인 사진 이미지 임포트

/* ── 네비 탭 (Figma 437:435) — 선택된 항목 없음 ── */
const navTabs = [
  { label: "Mean Girls", number: "[1]", href: "/mean-girls", active: false },
  { label: "Travel zine", number: "[2]", href: "/travel-zine", active: false },
  { label: "Name Card", number: "[3]", href: "/name-card", active: false },
  { label: "Contact", number: "[4]", href: "/#footer", active: false },
];

export default function BookSocietyDetail() {
  return (
    <div className={styles.page}>
      {/* ══════ 메인 카드 (Figma 437:418) ══════ */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ══════ 네비게이션 — 카드 내부 ══════ */}
        <nav className={styles.nav}>
          {navTabs.map((tab, i) => (
            <span key={tab.label} className={styles.navItem}>
              <Link
                href={tab.href}
                className={`${styles.navTab} ${tab.active ? styles.navActive : ""}`}
              >
                <span className={styles.navLabel}>{tab.label}</span>
                <span className={styles.navNum}>{tab.number}</span>
              </Link>
              {/* i === 1은 Travel zine 옆 고양이 (기존 프로젝트 기준 유지) */}
              {i === 1 && <img src={navCatImg.src} alt="" className={styles.navCat} />}
            </span>
          ))}
        </nav>

        {/* ── 배경 이미지 — opacity 60% ── */}
        <div className={styles.bgImg}>
          <Image src={detailBgImg} alt="" fill priority className="object-cover" sizes="100vw" />
        </div>

        {/* ── 다크 오버레이 — 77% ── */}
        <div className={styles.overlay} />

        {/* ── "GIRL" 워터마크 (Figma 437:430) ── */}
        <p className={styles.girlText}>GIRL</p>

        {/* ══════ 좌측 텍스트 (Figma 437:434 등) ══════ */}
        <motion.div
          className={styles.leftBlock}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* 타이틀 (Oswald 30px) */}
          <p className={styles.txtTitle}>The Book Society Website Renewal (Partial Design)</p>

          {/* Client 영역 */}
          <div className={styles.infoBlock} style={{ marginTop: "1.5vw" }}>
            <p className={styles.txtLabel}>Client</p>
            <p className={styles.txtValue}>
              The Book Society (더 북 소사이어티) (서울 기반 출판 컬렉티브)
            </p>
          </div>

          {/* Role 영역 */}
          <div className={styles.infoBlock} style={{ marginTop: "1vw" }}>
            <p className={styles.txtLabel}>Role</p>
            <p className={styles.txtValue}>Web UI Design (Freelance / via Junosoft)</p>
          </div>

          {/* Period 영역 */}
          <div className={styles.infoBlock} style={{ marginTop: "1vw" }}>
            <p className={styles.txtLabel}>Period</p>
            <p className={styles.txtValue}>2026.01.15 – 2026.01.31</p>
          </div>

          {/* Contribution 영역 */}
          <div className={styles.infoBlock} style={{ marginTop: "1vw" }}>
            <p className={styles.txtLabel}>Contribution</p>
            <ul className={styles.bullets}>
              <li>메인/서브 페이지 UI 디자인</li>
              <li>레이아웃 구조 설계</li>
              <li>콘텐츠 위계 정리</li>
              <li>타이포그래피 시스템 정리</li>
              <li>일부 페이지 리디자인 제안</li>
            </ul>
          </div>

          {/* Structure 영역 */}
          <p className={styles.txtGreen18} style={{ marginTop: "3vw" }}>
            Structure
          </p>
          <ul className={styles.bullets} style={{ marginTop: "0.5vw" }}>
            <li>타이포그래피 중심의 강한 제목 구조 (Oswald / Bebas Neue)</li>
            <li>상단/중단/하단의 명확한 정보 위계 설계</li>
            <li>컬러를 통한 캐릭터 구분</li>
            <li>반복 구조를 활용한 시리즈화 가능성</li>
          </ul>

          <ul className={styles.bullets} style={{ marginTop: "2vw" }}>
            <li>Title (Name / Archive Year)</li>
            <li>Identity Block (Name / Role)</li>
            <li>Short Statement</li>
            <li>Keyword Line (직무·역할 나열)</li>
            <li>Visual Background Layer</li>
          </ul>
        </motion.div>

        {/* ══════ 우측 사진 영역 (Figma 437:448) ══════ */}
        <motion.div
          className={styles.rightBlock}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.photo}>
            {/* 임시 플레이스홀더: 사용자가 피그마에서 우측 영역 이미지를 추출해 교체해주어야 함 */}
            <Image
              src={detailPhotoImg}
              alt="The Book Society Website Renewal 프로젝트 메인 이미지"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
