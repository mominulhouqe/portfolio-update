import type { Metadata } from "next";
import { formular } from "./fonts";
import "./styles/globals.scss";
export const metadata: Metadata = {
  title: "Portfolio Mominul Houqe",
  description: "A designer portfolio page showcasing my work and designs.",
  keywords: "design, portfolio, Mominul Houqe, web design, UI/UX",

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={formular.className}>{children}</body>
    </html>
  );
}
