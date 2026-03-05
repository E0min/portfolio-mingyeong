"use client";

import { Fragment } from "react";
import Link from "next/link";
import styles from "@/app/home.module.css";

// 내비게이션 고양이 아이콘 임포트
import navCatImg from "../../shared/assets/nav-cat-silhouette.png";

/* ── 탭 타입 정의 ── */
interface NavTab {
  label: string;
  number: string;
  /** 홈 페이지에서 스크롤할 섹션 ID */
  targetId?: string;
  /** 서브 페이지로 이동할 경로 */
  href?: string;
  hasArchive?: boolean;
}

/* ── 홈 페이지 기본 탭 데이터 ── */
const homeTabs: NavTab[] = [
  { label: "Travel zine", number: "[1]", targetId: "works" },
  { label: "Name Card", number: "[2]", targetId: "namecards" },
  { label: "Art Works", number: "[3]", targetId: "works" },
  { label: "Contact", number: "[4]", targetId: "footer", hasArchive: true },
];

/* ── 서브 페이지 공통 탭 데이터 ── */
export const subPageTabs: NavTab[] = [
  { label: "Mean Girls", number: "[1]", href: "/mean-girls" },
  { label: "Travel zine", number: "[2]", href: "/#works" },
  { label: "Name Card", number: "[3]", href: "/#namecards" },
  { label: "Contact", number: "[4]", href: "/#footer", hasArchive: true },
];

/* ── Props ── */
interface SectionNavProps {
  /** 커스텀 탭 배열 — 미지정 시 홈 탭 사용 */
  tabs?: NavTab[];
  /** 현재 활성 탭 라벨 — 하이라이트 표시 */
  activeTab?: string;
  /** 아이콘 삽입 위치 (탭 index 뒤) — 기본 1 (두 번째 탭 뒤) */
  iconAfterIndex?: number;
}

/**
 * 재사용 가능한 인페이지 네비게이션
 * - 홈: targetId로 스크롤 이동
 * - 서브페이지: href로 라우팅
 */
export default function SectionNav({
  tabs = homeTabs,
  activeTab,
  iconAfterIndex = 1,
}: SectionNavProps) {
  /** 스크롤 이동 핸들러 */
  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={styles.inPageNav}>
      <div className={styles.navTabsRow}>
        {tabs.map((tab, i) => (
          <Fragment key={tab.label}>
            {tab.href ? (
              /* ── 라우팅 모드 (Link) ── */
              <Link
                href={tab.href}
                className={styles.navTab}
                style={activeTab === tab.label ? { color: "var(--home-text-green)" } : undefined}
              >
                <span className={styles.navTabTop}>
                  {tab.label}
                  {tab.hasArchive && <span className={styles.navArchive}>(archive)</span>}
                </span>
                <span className={styles.navNumber}>{tab.number}</span>
              </Link>
            ) : (
              /* ── 스크롤 모드 (button) ── */
              <button
                className={styles.navTab}
                onClick={() => tab.targetId && handleScrollTo(tab.targetId)}
                type="button"
              >
                <span className={styles.navTabTop}>
                  {tab.label}
                  {tab.hasArchive && <span className={styles.navArchive}>(archive)</span>}
                </span>
                <span className={styles.navNumber}>{tab.number}</span>
              </button>
            )}

            {/* 장식 아이콘 — 지정된 인덱스 뒤에 배치 */}
            {i === iconAfterIndex && <img src={navCatImg.src} alt="" className={styles.navIcon} />}
          </Fragment>
        ))}
      </div>
    </nav>
  );
}
