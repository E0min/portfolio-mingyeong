import styles from "@/app/home.module.css";
import MeanCard from "./mean-card";
import BookSociety from "./book-society";
import TravelZine from "./travel-zine";
import NameCard from "./name-card";

/* ── PortfolioSection — Works + NameCards 통합 오케스트레이터 ──
   다크 존(MEAN 카드 + Travel Zine)과 라이트 존(명함 4종 + 마키)을
   하나의 섹션으로 통합. id="works", id="namecards" 앵커는 유지하여
   InPageNav 스크롤 동작에 영향 없음. */
export default function PortfolioSection() {
  return (
    <section className={styles.portfolio}>
      {/* ── 다크 존: MEAN 카드 + Travel Zine ── */}
      <div id="works" className={styles.portfolioDark}>
        <MeanCard />
        <TravelZine />
        <NameCard />
        <BookSociety />
      </div>
    </section>
  );
}
