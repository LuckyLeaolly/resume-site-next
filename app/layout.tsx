import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "李慧 | 前端工程师作品集",
  description: "中英双语前端工程师作品集，聚焦设计感、工程质量与复杂业务交付。",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
