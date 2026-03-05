"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/home.module.css";
import { verticalColumns, cardsData } from "./portfolio-data";

/**
 * 명함 섹션 컴포넌트
 * 전체 영역을 하나의 단위로 묶어 통합 호버 효과(VIEW MORE)를 적용
 */
export default function NameCard() {
  // 상위 2개의 카드 데이터만 사용
  const displayCards = cardsData.slice(0, 2);

  return (
    <section id="name-cards" className="relative">
      <Link href="/name-card" className={styles.portfolioItem}>
        <div className={styles.meanRow}>
          {displayCards.map((card, index) => (
            <motion.div
              key={index}
              className={styles.meanImgWrap}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className={styles.nameCard}>
                <div
                  className={styles.nameCardFrame}
                  style={{
                    backgroundColor: card.bg,
                    boxShadow: card.innerBorderColor
                      ? `inset 0 0 0 ${card.innerBorderWidth} ${card.innerBorderColor}`
                      : "none",
                  }}
                >
                  <div className={styles.nameCardContent}>
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
                        <Image
                          src={card.overlayImage}
                          alt=""
                          fill
                          style={{
                            left: card.overlayImageLeft ?? "0%",
                            width: card.overlayImageWidth ?? "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}

                    <div className={styles.nameCardMain}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <div>
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

                      <div className={styles.nameCardMiddle}>
                        <div>
                          <p
                            style={{
                              fontFamily: "'Pretendard', sans-serif",
                              fontSize: "clamp(12px, 1.01vw, 19.4px)",
                              lineHeight: "normal",
                            }}
                          >
                            Minami Aoi
                          </p>
                          <p
                            style={{
                              fontFamily: "'Pretendard', sans-serif",
                              fontSize: "clamp(12px, 1.01vw, 19.4px)",
                              lineHeight: "normal",
                            }}
                          >
                            Lee Young Min
                          </p>
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

                        <div className={styles.nameCardVerticalWrap}>
                          {verticalColumns.map((col, i) => (
                            <div
                              key={i}
                              style={{
                                writingMode: "vertical-rl",
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

                  <div className={styles.nameCardDivider}>
                    <Image src={card.dividerSvg} alt="" fill className="object-contain" />
                  </div>

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
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── 통합 호버 오버레이 ── */}
        <div className={styles.portfolioOverlay}>
          <span className={styles.viewMoreLabel}>VIEW MORE</span>
        </div>
      </Link>
    </section>
  );
}
