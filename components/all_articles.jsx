"use client";

import styles from "./articles.module.css";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import Article_Card from "./article_card";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Link from "next/link";

export default function Articles() {
  const [active_type, setActive_type] = useState(1);
  const [articles, setArticles] = useState([]);

  async function fetchArticles() {
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const articles = [];

      querySnapshot.forEach((doc) => {
        articles.push({ id: doc.id, ...doc.data() });
      });

      //   console.log(articles);
      setArticles(articles);
      //   return articles;
    } catch (error) {
      console.error("Error fetching documents:", error);
      return [];
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className={styles.articles_container}>
      <div className={styles.articles_menu}>
        <div className={styles.articles_menu_items}>
          <div className={styles.articles_menu_title}>All Articles</div>
          <ul>
            <li
              onClick={() => setActive_type(1)}
              className={
                active_type == 1
                  ? `${styles.menu_item_active}`
                  : `${styles.menu_item_inactive}`
              }
            >
              Paternity Fraud
            </li>
            <li
              onClick={() => setActive_type(2)}
              className={
                active_type == 2
                  ? `${styles.menu_item_active}`
                  : `${styles.menu_item_inactive}`
              }
            >
              DNA Testing
            </li>
            <li
              onClick={() => setActive_type(3)}
              className={
                active_type == 3
                  ? `${styles.menu_item_active}`
                  : `${styles.menu_item_inactive}`
              }
            >
              DNA Technology
            </li>
          </ul>
        </div>
        <form className={styles.articles_munu_search_box}>
          <input type="text" placeholder="Search what you want" />
          <FiSearch size={26} />
        </form>
      </div>
      <div className={styles.articles_listing}>
        {articles &&
          articles.map((article) => {
            console.log(article);
            const dateString = article.createdAt;
            const date = new Date(dateString);
            const formattedDate = date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            return (
              <Link href={`/posts/${article.slug}`} key={article.id}>
                <Article_Card
                  title={article.title}
                  readTime={article.readTime}
                  date={formattedDate}
                  photo={article.image}
                />
              </Link>
            );
          })}
        {articles.length === 0 && (
          <div className={styles.no_articles}>No articles found.</div>
        )}
      </div>
    </div>
  );
}
