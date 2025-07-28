"use client";

import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import Article_Card from "@/components/article_card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoIosAdd } from "react-icons/io";
import { CiRead } from "react-icons/ci";
import { CiUnread } from "react-icons/ci";
import LoadingComp from "@/components/loading-comp";

export default function Dashboard() {
  const router = useRouter();
  const [articles, setArticles] = useState([]);

  const [user, loading] = useAuthState(auth);

  async function fetchArticles() {
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const articles = [];

      querySnapshot.forEach((doc) => {
        articles.push({ id: doc.id, ...doc.data() });
      });

      if (user) {
        const userArticles = articles.filter(
          (article) => article.authorId === user.uid
        );
        setArticles(userArticles);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      return [];
    }
  }

  useEffect(() => {
    fetchArticles();
  }, [user, loading, articles]);

  // articles && console.log("Dashboard articles:", articles);

  if (!user) {
    return <LoadingComp message="Checking auth state..." />;
  }

  return (
    <div className={styles.dashboard_container}>
      <div className={styles.dashboard_articles_list}>
        <div className={styles.dashboard_mobile_controls}>
          <div
            className={styles.dashboard_mobile_controls_new_title}
            onClick={() => router.push("/dashboard/add-new-article")}
          >
            <p className={styles.new_article_title}>New article</p>
            <button>
              <IoIosAdd size={25} />
            </button>
          </div>
          <div
            className={styles.dashboard_mobile_controls_published}
            onClick={() => router.push("/dashboard/published-articles")}
          >
            <p className={styles.published_article_title}>Published articles</p>
            <button>
              <CiUnread size={25} />
            </button>
          </div>
          <div
            className={styles.dashboard_mobile_controls_unpublished}
            onClick={() => router.push("/dashboard")}
          >
            <p className={styles.unpublished_article_title}>
              Unpublished article
            </p>
            <button>
              <CiRead size={25} />
            </button>
          </div>
        </div>
        <h3 className={styles.dashboard_main_title}>Unpublished articles</h3>
        <div className={styles.dashboard_articles}>
          {articles.map((article) => (
            <Link
              href={`/posts/${article.slug}`}
              key={article.id}
              className={styles.article_card_link}
            >
              <Article_Card {...article} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
