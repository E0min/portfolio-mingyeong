"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/home.module.css";
import {
  bookSocietyTextLines,
  bookSocietyCoversTitlePrefix,
  bookSocietyCoversTitleHighlight,
  bookSocietyCoversData,
} from "./portfolio-data";

// 북 소사이어티 섹션 메인 이미지 임포트
import bookSocietyImg from "./assets/book-society.png";

/* ── 상단: MEAN 이미지 두 장 가로 나란히 다음 나오는 긴 가로 띠 (Figma 401:379 + 401:403) ── */
export default function BookSociety() {
  return (
    <Link href="/book-society" className={styles.bookSocietyLink}>
      <div className={styles.bookSociety}>
        <motion.div
          className={styles.bookSocietyFrame}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Image
            src={bookSocietyImg}
            alt="The Book Society Website Renewal"
            width={1919}
            height={431}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </motion.div>
      </div>
    </Link>
  );
}
