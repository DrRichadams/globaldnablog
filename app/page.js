import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/components/banner";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Banner />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
