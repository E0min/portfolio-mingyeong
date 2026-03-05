"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "@/app/home.module.css";
import { scatteredLabels, vinylTextLines } from "./portfolio-data";

// 섹션 하단 배경 이미지 임포트
import worksBottomBgImg from "./assets/works-bottom-bg.png";

/* ── 하단: Travel Zine 섹션 (Figma 265:375) ── */
export default function TravelZine() {
  return (
    <Link href="/travel-zine" className={styles.travelZineLink}>
      <div className={styles.travelZine}>
        {/* 다크 프레임 + 책장 배경 (Figma 265:377)
          프레임: left=0.85%, top=2.70%, w=98.36%, h=94.83% */}
        <div className={styles.travelZineFrame}>
          <Image
            src={worksBottomBgImg}
            alt="책장 배경"
            width={1913}
            height={546}
            style={{ width: "100%", height: "auto", display: "block" }}
            className="object-cover"
            priority
          />
        </div>

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
    </Link>
  );
}
