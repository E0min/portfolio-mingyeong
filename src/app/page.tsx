import styles from "./home.module.css";
import HeroSection from "@/components/home/hero-section";
import AboutSection from "@/components/home/about-section";
import PortfolioSection from "@/components/home/portfolio-section";
import FooterSection from "@/components/home/footer-section";

/**
 * 포트폴리오 메인 홈페이지
 * Figma 디자인(265:31) 기반 멀티섹션 레이아웃
 *
 * 섹션 순서:
 * 1. HeroSection — 산란 타이포그래피 + 만화 배경
 * 2. AboutSection — SectionNav + 사진 콜라주 + 소개 텍스트 + SectionBar
 * 3. PortfolioSection — MEAN 이미지 + Travel zine + 명함 4종
 * 4. FooterSection — SectionNav + 활동/교육/도구 + LIVE YOUR TRUTH + SectionBar
 *
 * SectionNav/SectionBar는 각 섹션 내부에 배치되어
 * 해당 섹션 범위 내에서만 sticky 고정됨 (Hero에서는 미표시)
 */
export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* 1. 히어로: 산란 텍스트 + 만화 오버레이 */}
      <HeroSection />

      {/* 2. 어바웃: SectionNav(상단 고정) + 사진 콜라주 + 자기소개 + SectionBar(하단 고정) */}
      <AboutSection />

      {/* 3. 포트폴리오: MEAN 카드 + Travel Zine + 명함 4종 */}
      <PortfolioSection />

      {/* 4. 푸터: SectionNav(상단 고정) + 활동/교육/도구 + SectionBar(하단 고정) */}
      <FooterSection />
    </main>
  );
}
