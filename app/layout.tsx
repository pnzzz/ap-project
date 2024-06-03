import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Toaster } from "sonner";
import Footer from "@/components/footer";


const inter = Press_Start_2P({ subsets: ["latin"], weight: "400" });
const norm = Inter({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "A Mundane Garden Game - Gardane.net",
  description: "A Mundane Garden Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <Providers>
        <body className={inter.className}>
					{children}
					<Footer/>
				</body>
				<Toaster position="bottom-center" />
      </Providers>
    </html>
  );
}
