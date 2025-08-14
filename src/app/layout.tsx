import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const font = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bagify",
  description: "UIM Inventory & Equipment Manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
