import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono, Rethink_Sans, Xanh_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
});

const dmsans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const xanh_mono = Xanh_Mono({
  variable: "--font-xanh-mono",
  weight: ["400"],
  subsets: ["latin", "latin-ext",],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Time Left",
  description:
    "A simple app to help you keep track of upcoming events and count down the days until they arrive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${rethinkSans.variable} ${dmsans.variable} ${xanh_mono.variable} bg-sf antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
