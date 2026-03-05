"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/home.module.css";
import { meanCardData } from "./portfolio-data";

/* ── 상단: MEAN 이미지 두 장 가로 나란히 (Figma 401:379 + 401:403) ── */
export default function MeanCard() {
  return (
    <div className={styles.meanRow}>
      {meanCardData.map((card, i) => (
        <motion.div
          key={i}
          className={styles.meanImgWrap}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Link href="/mean-girls" className={styles.meanLink}>
            <Image
              src={card.src}
              alt={card.alt}
              width={1928}
              height={776}
              className={styles.meanImg}
              sizes="50vw"
            />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
