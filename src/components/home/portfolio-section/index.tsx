import styles from "@/app/home.module.css";
import MeanCardRow from "./mean-card-row";
import TravelZine from "./travel-zine";
import NameCardGrid from "./name-card-grid";

/* ── PortfolioSection — Works + NameCards 통합 오케스트레이터 ──
   다크 존(MEAN 카드 + Travel Zine)과 라이트 존(명함 4종 + 마키)을
   하나의 섹션으로 통합. id="works", id="namecards" 앵커는 유지하여
   InPageNav 스크롤 동작에 영향 없음. */
export default function PortfolioSection() {
  return (
    <section className={styles.portfolio}>
      {/* ── 다크 존: MEAN 카드 + Travel Zine ── */}
      <div id="works" className={styles.portfolioDark}>
        <MeanCardRow />
        <TravelZine />
        <NameCardGrid />
      </div>
    </section>
  );
}
