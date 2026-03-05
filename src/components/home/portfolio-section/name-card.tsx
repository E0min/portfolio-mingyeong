"use client";

import { motion } from "motion/react";
import Link from "next/link";
import styles from "@/app/home.module.css";
import { verticalColumns, cardsData } from "./portfolio-data";

/* ── 명함 행 컴포넌트 (Figma 346:1422~1482 새 구조) ──
   gray wrapper → dark frame → colored content + SVG divider + footer marquee */

export default function NameCard() {
  return (
    <Link href="/name-card" className={styles.cardGridLink}>
      <div className={styles.cardGrid}>
        {cardsData.slice(0, 2).map((card, index) => (
          <motion.div
            key={index}
            className={styles.nameCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* ── 다크 프레임 (Figma: 5px solid #2b2929, rounded 5px) ──
          배경색 + 내부 컬러 보더(흰 카드 전용)를 프레임 전체에 적용
          inset box-shadow로 초록 보더를 content+divider+footer 모두 감쌈 */}
            <div
              className={styles.nameCardFrame}
              style={{
                backgroundColor: card.bg,
                boxShadow: card.innerBorderColor
                  ? `inset 0 0 0 ${card.innerBorderWidth} ${card.innerBorderColor}`
                  : "none",
              }}
            >
              {/* ── 컬러 콘텐츠 영역 (flex: 1 — divider/footer 제외 공간 채움) ── */}
              <div className={styles.nameCardContent}>
                {/* 캐릭터 오버레이 — 초록 카드 전용 (Figma 346:1468)
              오버레이는 콘텐츠 상단 88.4%만 차지 (하단 12%는 순수 배경)
              이미지는 컨테이너보다 넓게(116.44%) + 좌측 오프셋(-6.69%) */}
                {card.overlayImage && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: card.overlayHeight ?? "100%",
                      overflow: "hidden",
                      opacity: card.overlayOpacity,
                      pointerEvents: "none",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.overlayImage}
                      alt=""
                      style={{
                        position: "absolute",
                        top: 0,
                        left: card.overlayImageLeft ?? "0%",
                        width: card.overlayImageWidth ?? "100%",
                        height: "100%",
                        objectFit: "cover",
                        maxWidth: "none",
                      }}
                    />
                  </div>
                )}

                {/* 카드 콘텐츠 (relative z-10 — 오버레이 위) */}
                <div className={styles.nameCardMain}>
                  {/* ── 상단: MeanMan + Archive 2026 ── */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <div>
                      {/* MeanMan (Figma: Pretendard ~80px) */}
                      <p
                        style={{
                          fontFamily: "'Pretendard', sans-serif",
                          fontSize: "clamp(36px, 4.14vw, 79.4px)",
                          fontWeight: 400,
                          lineHeight: "normal",
                        }}
                      >
                        MeanMan
                      </p>
                      {/* 南 葵 : み나み あおい (Figma: Comfortaa+Noto Sans JP ~31px, Medium) */}
                      <p
                        style={{
                          fontFamily:
                            "var(--font-comfortaa), var(--font-noto-sans-jp), 'Comfortaa', 'Noto Sans JP', sans-serif",
                          fontSize: "clamp(16px, 1.61vw, 30.9px)",
                          fontWeight: 500,
                          lineHeight: "normal",
                        }}
                      >
                        南 葵 : みなみ あおい
                      </p>
                    </div>

                    {/* Archive 2026 (Figma: Pretendard ~40px) */}
                    <p
                      style={{
                        fontFamily: "'Pretendard', sans-serif",
                        fontSize: "clamp(20px, 2.07vw, 39.7px)",
                        fontWeight: 400,
                        lineHeight: "normal",
                      }}
                    >
                      Archive 2026
                    </p>
                  </div>

                  {/* ── 중단: 이름 + 직함 + 인용구 + 세로 텍스트 ── */}
                  <div className={styles.nameCardMiddle}>
                    <div>
                      {/* Minami Aoi (Figma: Pretendard ~19.4px) */}
                      <p
                        style={{
                          fontFamily: "'Pretendard', sans-serif",
                          fontSize: "clamp(12px, 1.01vw, 19.4px)",
                          lineHeight: "normal",
                        }}
                      >
                        Minami Aoi
                      </p>
                      {/* Lee Young Min */}
                      <p
                        style={{
                          fontFamily: "'Pretendard', sans-serif",
                          fontSize: "clamp(12px, 1.01vw, 19.4px)",
                          lineHeight: "normal",
                        }}
                      >
                        Lee Young Min
                      </p>
                      {/* DEVELOPER (Figma: Comfortaa ~22px, Medium) */}
                      <p
                        className={styles.nameCardBadge}
                        style={{
                          fontFamily: "var(--font-comfortaa), 'Comfortaa', sans-serif",
                          fontSize: "clamp(12px, 1.15vw, 22.1px)",
                          fontWeight: 500,
                          lineHeight: "normal",
                        }}
                      >
                        DEVELOPER
                      </p>

                      {/* 카드별 인용구 (Figma 346:1441, 1462, 1481) */}
                      {card.quote && (
                        <div
                          className={styles.nameCardQuoteBox}
                          style={{
                            fontFamily: card.quote.font,
                            fontSize: "clamp(10px, 0.97vw, 18.5px)",
                            lineHeight: 1.5,
                            fontWeight: 400,
                          }}
                        >
                          {card.quote.lines.map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 일본어 세로 텍스트 3열 (우하단, Figma 346:1429~1433) */}
                    <div className={styles.nameCardVerticalWrap}>
                      {verticalColumns.map((col, i) => (
                        <div
                          key={i}
                          style={{
                            writingMode: "vertical-rl" /* 세로 쓰기 (우→좌) */,
                            fontFamily:
                              "var(--font-comfortaa), var(--font-noto-sans-jp), 'Comfortaa', 'Noto Sans JP', sans-serif",
                            fontSize: "clamp(10px, 0.92vw, 17.7px)",
                            lineHeight: 1.3,
                          }}
                        >
                          {col.hasBrackets && <span style={{ fontSize: "0.9em" }}>【</span>}
                          {col.text}
                          {col.hasBrackets && <span style={{ fontSize: "0.9em" }}>】</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── SVG 구분선 (Figma: 각 카드 하단 벡터) ── */}
              <div className={styles.nameCardDivider}>
                <img src={card.dividerSvg} alt="" />
              </div>

              {/* ── 정적 마키 텍스트 (Figma: Comfortaa SemiBold/Medium — 카드별 상이) ── */}
              <div
                className={styles.nameCardFooter}
                style={{
                  ...(card.footerFontWeight && { fontWeight: card.footerFontWeight }),
                  ...(card.footerFontSize && { fontSize: card.footerFontSize }),
                }}
              >
                {card.footerText}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Link>
  );
}
