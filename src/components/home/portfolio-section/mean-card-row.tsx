"use client";

import { motion } from "motion/react";
import Image from "next/image";
import styles from "@/app/home.module.css";
import { meanCards } from "./portfolio-data";

/* ── 상단: 두 개의 대형 MEAN 카드 (Figma 302:693 + 304:737) ── */
export default function MeanCardRow() {
  return (
    <div className={styles.meanCardRow}>
      {meanCards.map((card, i) => (
        <motion.div
          key={i}
          className={styles.meanCard}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className={styles.workFrame}>
            <div className={styles.meanComposition}>
              <span className={styles.meanLetter}>M</span>
              <span className={styles.meanLetter}>E</span>
              <div className={styles.meanPhoto}>
                <Image
                  src={card.photo}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  className={styles.meanPhotoImg}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <span className={styles.meanLetter}>N</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
