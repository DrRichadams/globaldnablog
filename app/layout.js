import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Global DNA articles",
  description: "This is the official Global DNA blogs and articles website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <Navigation /> */}
        {children}
      </body>
    </html>
  );
}
