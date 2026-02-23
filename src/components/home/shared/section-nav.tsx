"use client";

import { Fragment } from "react";
import styles from "@/app/home.module.css";

/* ── 탭 데이터: 라벨, 번호, 대상 섹션 ID, archive 유무 ── */
const tabs = [
  { label: "Travel zine", number: "[1]", targetId: "works", hasArchive: false },
  { label: "Name Card", number: "[2]", targetId: "namecards", hasArchive: false },
  { label: "Art Works", number: "[3]", targetId: "works", hasArchive: false },
  { label: "Contact", number: "[4]", targetId: "footer", hasArchive: true },
];

/**
 * 섹션별 상단 고정 네비게이션 (sticky; top: 0)
 * 부모 섹션 범위 내에서만 고정됨 — About, Footer 섹션 내부에 배치
 */
export default function SectionNav() {
  /** 클릭 시 해당 섹션으로 부드럽게 스크롤 */
  const handleTabClick = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={styles.inPageNav}>
      {/* ── 탭 목록 행 ── */}
      <div className={styles.navTabsRow}>
        {tabs.map((tab, i) => (
          <Fragment key={tab.label}>
            <button
              className={styles.navTab}
              onClick={() => handleTabClick(tab.targetId)}
              type="button"
            >
              {/* 탭 상단: 이름 + (archive) 인라인 */}
              <span className={styles.navTabTop}>
                {tab.label}
                {tab.hasArchive && (
                  <span className={styles.navArchive}>(archive)</span>
                )}
              </span>
              {/* 탭 하단: 번호 */}
              <span className={styles.navNumber}>{tab.number}</span>
            </button>

            {/* 장식 아이콘 — Name Card(index 1) 뒤, Art Works 앞에 배치 */}
            {i === 1 && (
              <img
                src="/portfolio/nav-cat-silhouette.png"
                alt=""
                className={styles.navIcon}
              />
            )}
          </Fragment>
        ))}
      </div>

    </nav>
  );
}
