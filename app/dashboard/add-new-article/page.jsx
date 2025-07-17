"use client";

import styles from "./new-article.module.css";
import { useEffect, useState } from "react";

export default function NewArticle() {
  const [article, setArticle] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("asd");
  useEffect(() => {
    let slug_temp = title.toLocaleLowerCase().trim();
    const withStroke = slug_temp.replace(/\s+/g, "-").trim();
    setSlug(withStroke);
  }, [title]);

  return (
    <div className={styles.new_article_container}>
      <div className={styles.author_details}>
        <div className={styles.author_details_title}>
          <h4>Author Details</h4>
        </div>
        <input type="text" placeholder="Richard Mutambisi" />
        <input
          type="email"
          placeholder="Email: rmutambisi98@gmail.com"
          disabled
        />
        <input type="text" placeholder="User ID: 342342435243" disabled />
      </div>

      <div className={styles.new_article_details}>
        <div className={styles.new_article_title}>
          <p>Title</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.new_article_slug}>
          <p>Slug:</p>
          <input type="text" value={slug} disabled />
        </div>
        <div className={styles.new_article_article_area}>
          <p>Article</p>
          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
