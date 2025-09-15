import { Geist, Geist_Mono, Inter, Roboto } from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import Navigation from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Global DNA articles",
  description: "This is the official Global DNA blogs and articles website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}
      >
        <Navigation />
        {children}
        <footer className={styles.footer}>
          <ul className={styles.footer_socials}>
            <li>
              <FaXTwitter />
            </li>
            <li>
              <GrInstagram />
            </li>
            <li>
              <FaFacebookF />
            </li>
            <li>
              <FaYoutube />
            </li>
          </ul>
          <img src="/logos/globaldnalogo.png" />
          <p className={styles.footer_copywrite}>
            &copy; 2025 Global DNA International
          </p>
        </footer>
      </body>
    </html>
  );
}
