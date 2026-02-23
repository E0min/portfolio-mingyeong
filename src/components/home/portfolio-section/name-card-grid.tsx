"use client";

import styles from "@/app/home.module.css";
import { cardsData } from "./portfolio-data";
import NameCard from "./name-card";

/* ── 명함 2×2 그리드 (Figma 346:1422~1482) ──
   각 카드가 자체 포함 구조(gray wrapper + dark frame + divider + footer)이므로
   별도의 행 구분선이나 마키 컴포넌트 불필요 */
export default function NameCardGrid() {
  return (
    <div className={styles.cardGrid}>
      {cardsData.map((card, i) => (
        <NameCard key={i} card={card} index={i} />
      ))}
    </div>
  );
}
