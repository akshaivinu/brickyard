
import Preloader from "@/components/layout/Preloader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import type { Metadata } from "next";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Brickyard",
  description: "Brickyard Architects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased selection:bg-black selection:text-white h-full bg-brand-cream overflow-x-hidden`}
      >
        {/* <Preloader /> */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
