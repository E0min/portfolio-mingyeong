"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "@/app/home.module.css";
import SectionNav from "./shared/section-nav";
import SectionBar from "./shared/section-bar";

export default function FooterSection() {
  return (
    <section id="footer" className={styles.footer}>
      {/* ── 인페이지 네비 (섹션 내부 상단 고정 — Figma 구조 참고) ── */}
      <SectionNav />

      {/* ── 좌측 SVG 장식 보더 ── */}
      <div className={`${styles.decorBorder} ${styles.decorBorderLeft}`}>
        <Image
          src="/portfolio/footer-border.svg"
          alt=""
          width={8}
          height={894}
          className="h-full w-full object-contain"
        />
      </div>

      {/* ── 우측 SVG 장식 보더 ── */}
      <div className={`${styles.decorBorder} ${styles.decorBorderRight}`}>
        <Image
          src="/portfolio/footer-border.svg"
          alt=""
          width={8}
          height={894}
          className="h-full w-full object-contain"
        />
      </div>

      {/* ── 메인 콘텐츠 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10 px-8">
        {/* ── 좌측: 대형 타이포 + 사진 겹침 레이아웃 (Figma 340:1135) ──
            컨테이너: w=833, h=765 — 텍스트가 배경, 사진 2장이 위에 겹침 */}
        <div
          className="relative"
          style={{ aspectRatio: "833 / 765" }}  /* Figma 원본 비율 */
        >
          {/* ── 대형 타이포 — 배경 레이어 (Figma 338:1069) ──
              컨테이너 상단부터 시작, 약 69% 높이(526/765) 차지 */}
          <motion.div
            className={styles.footerTypo}
            style={{
              position: "absolute",          /* 겹침 레이아웃 기준 */
              top: 0,
              left: 0,
              width: "100%",
              zIndex: 1,                     /* 가장 뒤 — 사진이 위에 겹침 */
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p>LIVE YOUR TRUTH</p>
            <p>LIKE YOURSELF.</p>
            <p>CHANGE THE.</p>
            <p>WORLD.</p>
          </motion.div>

          {/* ── 큰 사진 프레임 (Figma 338:1070~1075) ──
              left=19%, top=19%, w=63%, h=47%
              이미지 opacity: 65%, 보더 1px #d7d7d7, rounded 10px */}
          <motion.div
            className="absolute overflow-hidden"
            style={{
              left: "18.96%",                /* (237-79) / 833 */
              top: "18.82%",                 /* (4172-4028) / 765 */
              width: "63.03%",               /* 525 / 833 */
              height: "46.67%",              /* 357 / 765 */
              border: "1px solid var(--home-border-gray)", /* #d7d7d7 */
              borderRadius: "10px",          /* Figma: 둥근 모서리 */
              zIndex: 2,                     /* 텍스트 위 */
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Image
              src="/portfolio/footer-photo.png"
              alt="활동 사진 — 졸업/단체"
              fill
              className="object-cover"
              style={{ opacity: 0.65, borderRadius: "1px" }} /* Figma: 65% 불투명 */
              sizes="(max-width: 768px) 100vw, 525px"
            />
            {/* "Me!" 라벨 (Figma 338:1076)
                left=(586-237)/525=66.48%, top=(4290-4172)/357=33.05% */}
            <span
              className="absolute"
              style={{
                left: "66.48%",
                top: "33.05%",
                fontFamily: "var(--font-oswald), Oswald, sans-serif",
                fontWeight: 500,
                fontSize: "15px",
                color: "#cbffbc",            /* Figma: 밝은 초록 */
                lineHeight: 1.486,
                zIndex: 3,
              }}
            >
              Me!
            </span>
          </motion.div>

          {/* ── 작은 사진 프레임 (Figma 338:1024~1034) ──
              left=0.36%, top=45.88%, w=38.06%, h=54.12%
              외곽: 1px #d7d7d7, rounded 8px
              내부 이미지: opacity 74%, 1px #626262
              로고 오버레이: opacity 41% */}
          <motion.div
            className="absolute overflow-hidden"
            style={{
              left: "0.36%",                 /* (82-79) / 833 */
              top: "45.88%",                 /* (4379-4028) / 765 */
              width: "38.06%",               /* 317 / 833 */
              height: "54.12%",              /* 414 / 765 */
              border: "1px solid var(--home-border-gray)", /* #d7d7d7 */
              borderRadius: "8px",           /* Figma: 8px */
              zIndex: 2,                     /* 텍스트 위 */
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* 배경 사진 (Figma 338:1032) — opacity 74% */}
            <div
              className="absolute overflow-hidden"
              style={{
                /* 프레임 안쪽 여백: left=(90-82)/317=2.52%, top=(4386-4379)/414=1.69% */
                left: "2.52%",
                top: "1.69%",
                width: "94.64%",             /* 300 / 317 */
                height: "96.62%",            /* 400 / 414 */
                border: "1px solid #626262", /* Figma: 회색 보더 */
                borderRadius: "1px",
              }}
            >
              <Image
                src="/portfolio/footer-photo-bg.png"
                alt="배경 사진 — 건물 앞 두 사람"
                fill
                className="object-cover"
                style={{ opacity: 0.74 }}    /* Figma: 74% 불투명 */
                sizes="317px"
              />
            </div>

            {/* 로고 오버레이 (Figma 338:1034) — opacity 41%
                left=(99-82)/317=5.36%, top=(4416-4379)/414=8.94%
                w=281/317=88.64%, h=60/414=14.49% */}
            <div
              className="absolute"
              style={{
                left: "5.36%",
                top: "8.94%",
                width: "88.64%",
                height: "14.49%",
              }}
            >
              <Image
                src="/portfolio/footer-logo.png"
                alt=""
                fill
                className="object-contain"
                style={{ opacity: 0.41 }}    /* Figma: 41% 불투명 */
              />
            </div>
          </motion.div>
        </div>

        {/* ── 우측: 활동 / 교육 / 도구 정보 ── */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* ── ACTIVITIES ── */}
          <div>
            <h3
              className="mb-2"
              style={{
                fontFamily: "var(--font-oswald), Oswald, sans-serif",
                fontWeight: 300,
                fontSize: "24px",
                color: "var(--home-text-light)",
              }}
            >
              ACTIVITIES
            </h3>
            <div
              style={{
                fontFamily: "var(--font-oswald), Oswald, sans-serif",
                fontWeight: 300,
                fontSize: "18px",
                color: "var(--home-text-light)",
                lineHeight: 1.6,
              }}
            >
              <p>
                <span className="text-[24px] font-normal">
                  UI·UX 디자인 실무 과정{" "}
                </span>
                <span className="text-[18px]">2025.09 - 2026.02</span>
              </p>
              <p>소속/기관 그린컴퓨터아카데미 | 국비지원</p>
              <p>
                Figma를 활용한 IA · USER FLOW · 웹·모바일 UI 설계 및 프로토타입
                제작
              </p>
            </div>
          </div>

          {/* ── EDUCATION ── */}
          <div>
            <h3
              className="mb-2"
              style={{
                fontFamily: "var(--font-oswald), Oswald, sans-serif",
                fontWeight: 300,
                fontSize: "24px",
                color: "var(--home-text-light)",
              }}
            >
              EDUCATION
            </h3>
            <div
              style={{
                fontFamily: "var(--font-oswald), Oswald, sans-serif",
                fontWeight: 300,
                fontSize: "18px",
                color: "var(--home-text-light)",
                lineHeight: 1.6,
              }}
            >
              <p>
                <span className="text-[24px] font-normal">
                  사이버한국외국어대학교 영문학 전공{" "}
                </span>
                <span className="text-[18px]">2025.09 - present</span>
              </p>
              <p>
                정규 교환학생 프로그램을 통해{" "}
                <span style={{ color: "var(--home-text-pink)" }}>
                  해외 Lexis 기관과 연계
                </span>
                하여 어학연수(국제교류) 과정 수료
              </p>

              <p className="mt-4">
                <span className="text-[24px] font-normal">
                  서울예술대학교 공연학부 연출 전공{" "}
                </span>
                <span className="text-[18px]">2022.03 - 2025.02</span>
              </p>
              <p>
                공연 영상 연출 및 기획을 통해 서사, 공간, 시선의 흐름을 설계하는
                사고방식을 체득
              </p>
              <p>
                관객 경험을 중심에 둔 연출 경험을 바탕으로 현재는 디지털
                환경에서의 콘텐츠 경험 설계로 확장
              </p>
            </div>
          </div>

          {/* ── TOOLS ── */}
          <div>
            <h3
              className="mb-2"
              style={{
                fontFamily: "var(--font-oswald), Oswald, sans-serif",
                fontWeight: 300,
                fontSize: "24px",
                color: "var(--home-text-light)",
              }}
            >
              TOOLS
            </h3>
            <div
              style={{
                fontFamily: "var(--font-oswald), Oswald, sans-serif",
                fontWeight: 300,
                fontSize: "30px",
                color: "var(--home-text-light)",
                lineHeight: 1.4,
                letterSpacing: "2.1px",
              }}
            >
              <p>
                <span style={{ color: "#5b8aff" }}>Figma</span>
                {" · Photoshop · Illustrator · InDesign"}
              </p>
              <p>HTML / CSS (Basic implementation)</p>
              <p>Claude · Midjourney · Antigravity</p>
              <p>Filezilla · Cafe24 · Naversmartstore</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── 최종 푸터 바 — 푸터 섹션 내부에서 하단 고정 ── */}
      <SectionBar variant="email" />
    </section>
  );
}
