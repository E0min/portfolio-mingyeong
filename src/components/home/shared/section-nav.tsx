"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/home.module.css";

// 네비게이션 양(Sheep) 아이콘 임포트
import navSheepImg from "../../shared/assets/nav-sheep.png";

/* ── 탭 타입 정의 ── */
export interface NavTab {
  label: string;
  number: string;
  /** 홈 페이지에서 스크롤할 섹션 ID */
  targetId?: string;
  /** 서브 페이지로 이동할 경로 */
  href?: string;
  hasArchive?: boolean;
}

/* ── 기본 탭 데이터 (Figma 460:140 / 462:945 공통 매핑) ── */
export const commonTabs: NavTab[] = [
  { label: "Mean Girls", number: "[1]", targetId: "works", href: "/mean-girls" },
  { label: "Travel zine", number: "[2]", targetId: "works", href: "/travel-zine" },
  { label: "Name Card", number: "[3]", targetId: "namecards", href: "/name-card" },
  { label: "Commissioned Work", number: "[4]", targetId: "works", href: "/commissioned-work" },
  { label: "Contact", number: "[5]", targetId: "footer", href: "/#footer" },
];

/* ── Props ── */
interface SectionNavProps {
  /** 'home' (그레이) vs 'detail' (화이트) ── 피그마 462:945 반영 */
  variant?: "home" | "detail";
  /** 커스텀 탭 배열 ── 미지정 시 공통 탭 사용 */
  tabs?: NavTab[];
  /** 현재 활성 탭 라벨 ── 하이라이트 표시 */
  activeTab?: string;
  /** 스크롤 대신 무조건 링크로 동작해야 하는지 여부 (상세 페이지용) */
  forceHref?: boolean;
}

/**
 * 재사용 가능한 네비게이션 컴포넌트
 * - Figma 460:140 (Home) & 462:945 (Detail) 통합 구현
 */
export default function SectionNav({
  variant = "home",
  tabs = commonTabs,
  activeTab,
  forceHref = false,
}: SectionNavProps) {
  /** 스크롤 이동 핸들러 */
  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 상세 페이지용(white) 스타일 적용 여부
  const navClass = `${styles.inPageNav} ${variant === "detail" ? styles.navDetail : ""}`;

  return (
    <nav className={navClass}>
      <div className={styles.navTabsRow}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;
          const isLink = forceHref || !!tab.href;

          return (
            <Fragment key={tab.label}>
              {isLink ? (
                /* ── 링크 모드 (Link) ── */
                <Link
                  href={tab.href || "/"}
                  className={styles.navTab}
                  style={isActive ? { color: "var(--home-text-green)" } : undefined}
                >
                  <span className={styles.navTabTop}>
                    <span className={styles.navLabelText}>{tab.label}</span>
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
                  style={isActive ? { color: "var(--home-text-green)" } : undefined}
                >
                  <span className={styles.navTabTop}>
                    <span className={styles.navLabelText}>{tab.label}</span>
                    {tab.hasArchive && <span className={styles.navArchive}>(archive)</span>}
                  </span>
                  <span className={styles.navNumber}>{tab.number}</span>
                </button>
              )}
            </Fragment>
          );
        })}

        {/* ── 양(Sheep) 아이콘: 절대 위치 배치 (Name Card와 겹침) ── */}
        <div className={styles.navSheepIcon}>
          <Image src={navSheepImg} alt="" fill className="object-contain" />
        </div>
      </div>
    </nav>
  );
}
