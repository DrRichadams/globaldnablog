"use client";

import styles from "../dashboard.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Link from "next/link";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import Article_Card from "@/components/article_card";

export default function PublishedArticlesPage() {
  const [user, loading] = useAuthState(auth);
  const [articles, setArticles] = useState([]);
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

  return (
    <div className={styles.dashboard_container}>
      <div className={styles.dashboard_articles_list}>
        <h3 className={styles.dashboard_main_title}>Published articles</h3>
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
