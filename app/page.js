import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/banner";
import Trending from "@/components/trending";
import Articles from "@/components/all_articles";
import { getAllPosts } from "@/llib/posts";

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
    </div>
  );
}
