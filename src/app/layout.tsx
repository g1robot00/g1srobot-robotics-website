import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.g1robot.com'),
  alternates: { canonical: 'https://g1srobot.com'},
  title: {
    default: "지원에스로봇 G1sRobot | 스마트 공장 자동화 및 협소 공간 맞춤형 로봇 솔루션",
    template: "%s | 지원에스로봇 G1sRobot",
  },
  description: "공장 자동화 및 무인화 시스템 전문, 지원에스로봇 G1sRobot 입니다. 협소한 자동창고와 같은 환경에 최적화된 고효율 물류 로봇과 특수목적 전용장비 개발로 최상의 생산성을 제공합니다.",
  keywords: ["공장 자동화", "무인화 시스템", "협소 공간 로봇", "물류 로봇 개발", "지원에스로봇", "시험검사장비", "물류 이송 핸들링", "G1sRobot", "자동창고 로봇", "무인 자동화"],
  openGraph: {
    title: "지원에스로봇(G1sRobot) 공식 웹사이트",
    description: "협소공간 효율을 극대화하는 혁신적인 로봇 및 무인 자동화 시스템 개발 전문",
    images: ["/img/HeroBg/g1s_high1.jpg"],
    type: "website"
  },
  verification: {
    other: {
      "naver-site-verification": process.env.NEXT_PUBLIC_NAVER_VERIFICATION || ''
    }
  }
};

export const revalidate = 3600;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
