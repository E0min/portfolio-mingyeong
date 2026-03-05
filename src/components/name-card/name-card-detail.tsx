"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "./name-card.module.css";
import SectionNav from "@/components/home/shared/section-nav";

// 이미지 자원들을 컴포넌트 내부에서 응집도 있게 관리하기 위해 임포트합니다.
import detailBgImg from "../shared/assets/detail-bg.png"; // 배경 이미지 임포트
import cardsGridImg from "./assets/cards-grid.png"; // 카드 그리드 이미지 임포트

export default function NameCardDetail() {
  return (
    <div className={styles.page}>
      {/* ══════ 메인 카드 (Figma 402:788) ══════ */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ══════ 네비게이션 — 카드 내부 ══════ */}
        <SectionNav variant="detail" activeTab="Name Card" />

        {/* ── 배경 이미지 (402:791) — opacity 60% ── */}
        <div className={styles.bgImg}>
          <Image src={detailBgImg} alt="" fill priority className="object-cover" sizes="100vw" />
        </div>

        {/* ── 다크 오버레이 (402:792) — 77% ── */}
        <div className={styles.overlay} />

        {/* ── "GIRL" 워터마크 (402:800) ── */}
        <p className={styles.girlText}>GIRL</p>

        {/* ══════ 좌측 텍스트 (Figma 402:805~806, 801, 937, 804) ══════ */}
        <motion.div
          className={styles.leftBlock}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Name Card 타이틀 (402:805 첫줄, Oswald Regular 30px) */}
          <p className={styles.txtTitle}>Name Card</p>

          {/* Visual Identity Card Design (402:805) */}
          <p className={styles.txtGreen18}>Visual Identity Card Design</p>

          {/* NAME CARD 라벨 (402:806, top=227) */}
          <p className={styles.txtGreen18} style={{ marginTop: "2.17vw" }}>
            NAME CARD
          </p>

          {/* 본문 설명 (402:805 body) */}
          <div className={styles.txtBody} style={{ marginTop: "0.54vw" }}>
            <p>
              <span className={styles.green}>NAME CARD</span>는
            </p>
            <p>개인의 정체성을 하나의 아카이브 카드로 시각화한 아이덴티티 디자인 프로젝트입니다.</p>
            <p>
              단순한 연락처 전달용 명함이 아니라, 이름 · 역할 · 태도 · 세계관을 한 장의 구조 안에
              담아내는
            </p>
            <p>시각적 기록물로 기획되었습니다. 카드는 정보의 나열이 아니라 타이포그래피와 컬러,</p>
            <p>위계 구조를 통해 한 사람의 성격과 방향성을 드러내도록 설계되었습니다.</p>
          </div>

          {/* Archive 2026 라벨 (402:937, top=361) */}
          <p className={styles.txtGreen18} style={{ marginTop: "1.08vw" }}>
            Archive 2026
          </p>

          <div className={styles.txtBody} style={{ marginTop: "0.54vw" }}>
            <p>
              <span className={styles.green}>Archive 2026</span> 이라는 설정 아래 인물은 하나의
              브랜드처럼 다뤄지며
            </p>
            <p>각 카드마다 다른 색과 분위기로 캐릭터가 구성됩니다.</p>
          </div>

          {/* Design Focus (402:801, top=442) */}
          <p className={styles.txtGreen18} style={{ marginTop: "1.62vw" }}>
            Design Focus
          </p>
          <ul className={styles.bullets}>
            <li>타이포그래피 중심의 강한 제목 구조 (Oswald / Bebas Neue)</li>
            <li>상단/중단/하단의 명확한 정보 위계 설계</li>
            <li>컬러를 통한 캐릭터 구분</li>
            <li>반복 구조를 활용한 시리즈화 가능성</li>
          </ul>

          {/* Structure (402:804, top=634) */}
          <p className={styles.txtGreen18} style={{ marginTop: "1.62vw" }}>
            Structure
          </p>
          <ul className={styles.bullets}>
            <li>Title (Name / Archive Year)</li>
            <li>Identity Block (Name / Role)</li>
            <li>Short Statement</li>
            <li>Keyword Line (직무·역할 나열)</li>
            <li>Visual Background Layer</li>
          </ul>
        </motion.div>

        {/* ══════ 카드 그리드 이미지 (Figma 402:807) ══════ */}
        <motion.div
          className={styles.cardsGrid}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Image
            src={cardsGridImg}
            alt="Name Card 컬렉션 — 6종 카드 그리드"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 53vw"
          />
        </motion.div>

        {/* ══════ Reflection (Figma 402:802~803) ══════ */}
        <motion.div
          className={styles.reflectionBlock}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className={styles.reflectionLabel}>Reflection</p>
          <p className={styles.reflectionBody}>
            이 작업은
            <br />
            명함을 단순한 정보 카드가 아닌
            <br />
            하나의 세계관을 담는 매체로 확장하는 실험이었습니다.
          </p>
          <p className={styles.reflectionBody} style={{ marginTop: "0.5em" }}>
            이름을 보여주는 방식을 고민하며
            <br />
            타이포그래피와 구조가 곧 인물의 태도가 될 수 있다는 점을 탐구했습니다.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
