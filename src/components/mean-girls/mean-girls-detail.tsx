"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "./mean-girls.module.css";
import SectionNav from "@/components/home/shared/section-nav";

// 이미지 자원들을 컴포넌트 내부에서 응집도 있게 관리하기 위해 임포트합니다.
import detailBgImg from "../shared/assets/detail-bg.png"; // 배경 이미지 임포트
import detailPhotoImg from "./assets/detail-photo.png"; // 상세 페이지 메인 사진 이미지 임포트
import detailArrowImg from "./assets/detail-arrow.svg"; // 상세 페이지 화살표 SVG 임포트
import detailCircleImg from "./assets/detail-circle.svg"; // 뷰 모어 원형 SVG 임포트

/* ── 영화 타이틀 (Figma 402:600~606) ── */
const filmTitles = [
  "nO other choice",
  "PARASite",
  "past lives",
  "anora",
  "anAtomy of all",
  "It Was Just an Accidente",
];

export default function MeanGirlsDetail() {
  return (
    <div className={styles.page}>
      {/* ══════ 메인 카드 (Figma 402:577) ══════ */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ══════ 네비게이션 — 카드 내부 ══════ */}
        <SectionNav variant="detail" activeTab="Mean Girls" />

        {/* ── 배경 이미지 (402:583) — opacity 60% ── */}
        <div className={styles.bgImg}>
          <Image src={detailBgImg} alt="" fill priority className="object-cover" sizes="100vw" />
        </div>

        {/* ── 다크 오버레이 (402:585) — 77% ── */}
        <div className={styles.overlay} />

        {/* ── "EDIT" 워터마크 (402:586) — 검정 26% ── */}
        <p className={styles.editText}>EDIT</p>

        {/* ── (archive) (402:584) ── */}
        <span className={styles.archive}>(archive)</span>

        {/* ══════ 좌측 텍스트 (Figma 402:613~618) ══════ */}
        <motion.div
          className={styles.leftBlock}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* MeanGirls 타이틀 (Oswald Regular 30px) */}
          <p className={styles.txtTitle}>MeanGirls</p>

          {/* Editorial Film Archive */}
          <p className={styles.txtGreen18}>Editorial Film Archive</p>

          {/* mean-girl.vercel.app (402:614, top=230) */}
          <p className={styles.txtGreen18} style={{ marginTop: "1.87vw" }}>
            mean-girl.vercel.app
          </p>

          {/* MeanGirls 라벨 (402:615, top=284) */}
          <p className={styles.txtGreen18} style={{ marginTop: "0.93vw" }}>
            MeanGirls
          </p>

          {/* 본문 설명 */}
          <div className={styles.txtBody} style={{ marginTop: "0.47vw" }}>
            <p>
              <span className={styles.pink}>MeanGirls</span>는 영화를 단순히 나열하는 대신,
            </p>
            <p>
              <span className={styles.green}>&lsquo;선택과 해석&rsquo;</span>을 중심으로 다시 구성한{" "}
              <span className={styles.green}>에디토리얼 플랫폼</span> 입니다.
            </p>
            <p>이 프로젝트는 영화 데이터베이스가 아니라,</p>
            <p>하나의 관점으로 영화를 읽어가는 구조를 실험하기 위해 시작되었습니다.</p>
            <p>영화는 장르나 흥행 순위로 정렬되지 않습니다.</p>
            <p>대신 하나의 시선과 맥락 속에서 다시 배치됩니다.</p>
            <p>각 섹션은 영화를 정보가 아닌 이야기로 경험하도록 설계되었습니다.</p>
          </div>

          {/* Design Focus (402:616, top=501) */}
          <p className={styles.txtGreen18} style={{ marginTop: "1.4vw" }}>
            Design Focus
          </p>
          <ul className={styles.bullets}>
            <li>
              섹션별 명확한 구조 분리{" "}
              <span className={styles.green}>(All Films / Collections / Docs)</span>
            </li>
            <li>이미지 중심의 화면 구성</li>
            <li>컬러를 통한 영역 구분</li>
            <li>
              큐레이션 기반 콘텐츠 확장{" "}
              <span className={styles.green}>(Award / Director / Theme)</span>
            </li>
          </ul>

          {/* Structure (402:617, top=662) */}
          <p className={styles.txtGreen18} style={{ marginTop: "1.4vw" }}>
            Structure
          </p>
          <ul className={styles.bullets}>
            <li>Hero Section</li>
            <li>All Films</li>
            <li>Collections</li>
            <li>Docs</li>
            <li>Article Detail</li>
          </ul>
        </motion.div>

        {/* ══════ Typography 블록 (Figma 402:620~624) ══════ */}
        <motion.div
          className={styles.typographyBlock}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className={styles.sectionLabel}>Typography</p>
          <p className={styles.rightBody}>
            <span className={styles.greenMedium}>OSWALD</span>와{" "}
            <span className={styles.greenMedium}>Bebas Neue</span>를 사용하여
            <br />
            강한 타이틀 중심 구조를 설계했습니다.
          </p>
        </motion.div>

        {/* ══════ Reflection 블록 (Figma 402:622 + 402:620 하단) ══════ */}
        <motion.div
          className={styles.reflectionBlock}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className={styles.sectionLabel}>Reflection</p>
          <p className={styles.rightBody}>
            이 프로젝트를 통해
            <br />
            영화를 어떻게 보여줄 것인가보다
            <br />
            어떤 흐름으로 경험하게 할 것인가에 대해 고민했습니다.
          </p>
        </motion.div>

        {/* ══════ 우측 사진 영역 (Figma 402:587~612) ══════ */}
        <motion.div
          className={styles.rightBlock}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.photo}>
            <Image
              src={detailPhotoImg}
              alt="MeanGirls 프로젝트 메인 이미지"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />

            {/* 미니 내비 (402:595~599) */}
            <div className={styles.miniNav}>
              <span>All Films</span>
              <span>Collections</span>
              <span>Docs</span>
              <span>About</span>
            </div>

            {/* Mean girls 링크 (402:607) */}
            <span className={styles.meanLink}>Mean girls</span>

            {/* 영화 타이틀 목록 (402:600~606) */}
            <div className={styles.films}>
              {filmTitles.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>

            {/* 화살표 (402:608) */}
            <div className={styles.arrow}>
              <Image src={detailArrowImg} alt="" fill />
            </div>

            {/* VIEW MORE (402:610~612) */}
            <a
              href="https://mean-girl.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewMore}
            >
              <Image src={detailCircleImg} alt="" fill className={styles.vmCircle} />
              <span className={styles.vmText}>VIEW MORE</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
