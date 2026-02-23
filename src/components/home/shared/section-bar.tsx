"use client";

import styles from "@/app/home.module.css";

interface SectionBarProps {
  /** github URL 대신 표시할 텍스트 (일부 푸터바는 이메일, 일부는 GitHub) */
  variant?: "github" | "email";
}

/**
 * 섹션별 하단 고정 바 (sticky; bottom: 0)
 * 부모 섹션 범위 내에서만 고정됨 — About, Footer 섹션 내부에 배치
 * PARK MIN GYEONG / ABOUT / 링크 / ©2026
 */
export default function SectionBar({ variant = "email" }: SectionBarProps) {
  return (
    <div className={styles.footerBar}>
      <span>PARK MIN GYEONG</span>
      <span>ABOUT</span>
      {variant === "github" ? (
        <a
          href="https://github.com/alsrud6339-cmd"
          target="_blank"
          rel="noopener noreferrer"
          className="underline" /* 링크 밑줄 */
        >
          https://github.com/alsrud6339-cmd
        </a>
      ) : (
        <span>alsrud6339@gmail.com</span>
      )}
      <span>©2026</span>
    </div>
  );
}
