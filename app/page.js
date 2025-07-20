import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/banner";
import Trending from "@/components/trending";
import Articles from "@/components/all_articles";
import { FaXTwitter } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { FaFacebookF } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { getAllPosts } from "@/llib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Banner />
        <Trending />
        <Articles />
        {/* {posts.map((post) => (
          <li key={post.title}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            <p>{post.date}</p>
          </li>
        ))} */}
      </main>
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
    </div>
  );
}
