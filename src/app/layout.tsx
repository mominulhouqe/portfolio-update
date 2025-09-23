import type { Metadata } from "next";
import { formular } from "./fonts";
import "./styles/globals.scss";
export const metadata: Metadata = {
  title: "Portfolio Mominul Haque",
  description: "A designer portfolio page showcasing my work and designs.",
  keywords:
    "design, portfolio, Mominul Haque, web design, shopify webdevelopment",
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
