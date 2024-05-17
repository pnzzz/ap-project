import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const inter = Press_Start_2P({ subsets: ["latin"], weight: "400" });
const norm = Inter({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "Game",
  description: "AP Comp Sci Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Providers>
        <body className={inter.className}>{children}</body>
        <footer className="text-center text-white text-[10px]">
          <p className={inter.className}>made by zak heltke</p>
        </footer>
      </Providers>
    </html>
  );
}
