import type { Metadata } from "next";
import { Oswald, Inter, Comfortaa, Noto_Sans_JP, Bebas_Neue } from "next/font/google";
import "./globals.css";

/* ── Google 폰트 로드 ── */
/* Oswald: 네비게이션, 제목, 영문 레이블용 */
const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

/* Inter: UI 보조 텍스트 (번호, 라벨 등) */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* Comfortaa: 일본어 장식 텍스트 보조 */
const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/* Bebas Neue: Works 섹션 MEAN 대형 타이틀 */
const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
  weight: "400",
});

/* Noto Sans JP: 일본어 세로쓰기 텍스트 */
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "PARK MIN GYEONG | Portfolio",
  description: "박민경 포트폴리오 — 에디토리얼 디자인, UI/UX, 브랜딩, 비주얼 아이덴티티",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${oswald.variable} ${inter.variable} ${comfortaa.variable} ${notoSansJP.variable} ${bebasNeue.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
