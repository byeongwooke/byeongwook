import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "유병욱 | 서비스 기획자 & 프로덕트 매니저 (Mini-CEO)",
  description:
    "카카오모빌리티와 B2B 플랫폼에서 신사업 론칭과 물류 인프라를 설계해 온 기획자 유병욱의 포트폴리오입니다. 비즈니스 가설부터 실행, P&L 최적화까지 오너십을 갖고 완수합니다.",
  keywords: [
    "유병욱",
    "프로덕트 매니저",
    "서비스 기획자",
    "Product Manager",
    "Product Owner",
    "카카오모빌리티",
    "물류 플랫폼",
    "B2B ERP",
    "신사업 기획",
    "Mini-CEO",
  ],
  authors: [{ name: "유병욱", url: "mailto:byeongwooke@gmail.com" }],
  creator: "유병욱",
  openGraph: {
    title: "유병욱 | 서비스 기획자 & 프로덕트 매니저 (Mini-CEO)",
    description:
      "비즈니스의 구조를 세우고, 사람의 온도를 더합니다. 카카오모빌리티 및 B2B 플랫폼 PM 유병욱 포트폴리오",
    type: "website",
    locale: "ko_KR",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-screen bg-white text-[#111111] antialiased selection:bg-[#111111] selection:text-white">
        {children}
      </body>
    </html>
  );
}
