"use client";

import Image from "next/image";
import styles from "@/app/home.module.css";
import { scatteredLabels, vinylTextLines } from "./portfolio-data";

/* ── 하단: Travel Zine 섹션 (Figma 265:375) ── */
export default function TravelZine() {
  return (
    <div className={styles.travelZine}>

      {/* 다크 프레임 + 책장 배경 (Figma 265:377)
          프레임: left=0.85%, top=2.70%, w=98.36%, h=94.83% */}
      <div className={styles.travelZineFrame}>
        <Image
          src="/portfolio/works-bottom-bg.png"
          alt="책장 배경"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* 산란 텍스트 — Oswald Light, rgba(222,224,81,0.66) */}
      {scatteredLabels.map((label) => (
        <span
          key={label.text}
          className={styles.travelZineLabel}
          style={{
            left: label.left,
            top: label.top,
            fontSize: `clamp(${Math.round(label.size * 0.4)}px, ${(label.size / 1920 * 100).toFixed(2)}vw, ${label.size}px)`,
            transform: label.rotate ? `rotate(${label.rotate}deg)` : undefined,
          }}
        >
          {label.text}
        </span>
      ))}

      {/* ── 바이닐 LP 디스크 (Figma 265:381) ──
          위치: left=68.97%, top=20.35%, w=20.13%, h=68.83% */}
      <div className={styles.vinylGroup}>
        {/* LP 디스크 — CSS 그루브 + 무한 회전 */}
        <div className={styles.vinylDisc} />

        {/* 디스크 위 정적 텍스트 — 회전하지 않음 */}
        <div className={styles.vinylText}>
          {vinylTextLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
