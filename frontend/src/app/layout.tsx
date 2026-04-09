import type { Metadata } from "next";
import customFont from "next/font/local";

import "./globals.css";

export const metadata: Metadata = {
  title: "FreeFire BanPick System - by github@iamdinhduchuy",
  description: "Công cụ hỗ trợ chế độ BanPick trong game FreeFire, giúp người chơi dễ dàng lựa chọn và cấm tướng một cách hiệu quả real-time.",
};

const GFFFont = customFont({
  src: [
    { path: "../assets/fonts/GFF_Latin_Thin.woff2", weight: "100", style: "normal" },
    { path: "../assets/fonts/GFF_Latin_Light.woff2", weight: "300", style: "normal" },
    { path: "../assets/fonts/GFF_Latin_Regular.woff2", weight: "400", style: "normal" },
    { path: "../assets/fonts/GFF_Latin_Medium.woff2", weight: "500", style: "normal" },
    { path: "../assets/fonts/GFF_Latin_CDMedium.woff2", weight: "600", style: "normal" },
    { path: "../assets/fonts/GFF_Latin_Bold.woff2", weight: "700", style: "normal" },
    { path: "../assets/fonts/GFF_Latin_ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../assets/fonts/GFF_VN_Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-GFF",
  display: "swap",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GFFFont.variable} h-full`}>
      <body className={`${GFFFont.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}