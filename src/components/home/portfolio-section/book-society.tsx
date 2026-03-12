"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/home.module.css";

// 북 소사이어티 섹션 메인 이미지 임포트
import bookSocietyImg from "./assets/book-society.png";

/* ── 상단: MEAN 이미지 두 장 가로 나란히 다음 나오는 긴 가로 띠 (Figma 401:379 + 401:403) ── */
export default function BookSociety() {
  return (
    <section id="book-society" className="relative mt-[-1px]">
      <Link href="/commissioned-work" className={styles.portfolioItem}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Image
            src={bookSocietyImg}
            alt="The Book Society Website Renewal"
            width={1919}
            height={431}
            className="h-auto w-full"
          />
        </motion.div>

        {/* ── 호버 오버레이 (Figma 460:329) ── */}
        <div className={styles.portfolioOverlay}>
          <span className={styles.viewMoreLabel}>VIEW MORE</span>
        </div>
      </Link>
    </section>
  );
}
