import styles from "./page.module.css";
import Banner from "@/components/banner";
import Trending from "@/components/trending";
import Articles from "@/components/all_articles";
import NewLetter from "@/components/newletter";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Banner />
        <Trending />
        <Articles />
        <NewLetter />
      </main>
    </div>
  );
}
