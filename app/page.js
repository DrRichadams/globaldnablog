import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/banner";
import Trending from "@/components/trending";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Banner />
        <Trending />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
