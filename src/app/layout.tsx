import type { Metadata } from "next";
import { formular } from "./fonts";
import "./styles/globals.scss";

export const metadata: Metadata = {
  title: "Mominul Haque | Shopify Web Developer & Designer Portfolio",
  description:
    "Explore the professional portfolio of Mominul Haque — a Shopify web developer and designer specializing in custom Shopify themes, UI/UX design, and eCommerce optimization.",
  keywords:
    "Mominul Haque, Shopify developer, Shopify designer, Shopify web development, Shopify expert, eCommerce website design, custom Shopify themes, Shopify Liquid developer, Shopify store setup, responsive Shopify design, UI UX portfolio, Next.js developer, frontend developer Bangladesh",
  openGraph: {
    title: "Mominul Haque | Shopify Web Developer & Designer",
    description:
      "Professional portfolio showcasing Shopify web development, custom themes, and modern eCommerce design by Mominul Haque.",
    url: "https://your-portfolio-domain.com",
    siteName: "Mominul Haque Portfolio",
    images: [
      {
        url: "https://your-portfolio-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mominul Haque Shopify Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mominul Haque | Shopify Web Developer & Designer",
    description:
      "Shopify developer portfolio featuring design, Liquid customization, and Shopify store optimization.",
    images: ["https://your-portfolio-domain.com/og-image.jpg"],
  },
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
