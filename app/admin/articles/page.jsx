"use client";

import styles from "./admin_articles.module.css";
import Link from "next/link";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { FaCircleUser } from "react-icons/fa6";

// Function to fetch articles from Firestore
async function fetchArticlesFromFirestore() {
  const articlesCol = collection(db, "articles");
  const articlesSnapshot = await getDocs(articlesCol);
  return articlesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default function AdminArticles() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticlesFromFirestore().then((articlesref) => {
      setArticles(articlesref);
      // console.log("Articles ref: ", articlesref);
    });
  }, []);

  async function featuringUpdate(articleId, slug) {
    const updatedArticles = articles.map((article) =>
      article.articleId === articleId
        ? { ...article, isFeatured: !article.isFeatured }
        : article
    );
    setArticles(updatedArticles);
    const articleFind = updatedArticles.find(
      (article) => article.articleId === articleId
    );
    const docRef = doc(db, "articles", slug);
    try {
      await updateDoc(docRef, {
        isFeatured: articleFind.isFeatured,
      });
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  async function archivingUpdate(articleId, slug) {
    const updatedArticles = articles.map((article) =>
      article.articleId === articleId
        ? { ...article, isArchived: !article.isArchived }
        : article
    );
    setArticles(updatedArticles);
    const articleFind = updatedArticles.find(
      (article) => article.articleId === articleId
    );
    const docRef = doc(db, "articles", slug);
    try {
      await updateDoc(docRef, {
        isArchived: articleFind.isArchived,
      });
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  async function publishingUpdate(articleId, slug) {
    const updatedArticles = articles.map((article) =>
      article.articleId === articleId
        ? { ...article, isPublished: !article.isPublished }
        : article
    );
    setArticles(updatedArticles);
    const articleFind = updatedArticles.find(
      (article) => article.articleId === articleId
    );
    const docRef = doc(db, "articles", slug);
    try {
      await updateDoc(docRef, {
        isPublished: articleFind.isPublished,
        publishedOn: new Date().toISOString(),
      });
      console.log("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  return (
    <div className={styles.admin_articles_container}>
      <h2 className={styles.admin_articles_title}>Articles Management</h2>
      <p className={styles.admin_articles_sub_title}>
        Manage articles and their publishing status (Published articles are seen
        by visitors of the blog,you can change this at any time but you need to
        be careful).
      </p>
      <div className={styles.admin_articles_box}>
        {articles?.map((article) => (
          <div className={styles.admin_article} key={article.articleId}>
            <div className={styles.left_details}>
              <div className={styles.img_box}>
                <img src={`/blog_imgs/${article.image}`} alt="" />
              </div>
              <div className={styles.article_details}>
                <Link href={`/posts/${article.slug}`}>
                  {/* <h3>{article.title}</h3> */}
                  <h3>
                    {article.title.length > 50
                      ? article.title.slice(0, 50) + "........"
                      : article.title}
                  </h3>
                </Link>
                <div className={styles.author_details}>
                  <FaCircleUser size={20} color="#909090" />
                  <div className={styles.personal_details}>
                    <p>Author: {article.authorName}</p>
                    <p>Email: {article.authorEmail}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.article_action_controls}>
              <div className={styles.control_box}>
                <p>Featured</p>
                <ToggleBtn
                  isToggled={article.isFeatured}
                  onClick={() =>
                    featuringUpdate(article.articleId, article.slug)
                  }
                />
              </div>
              <div className={styles.control_box}>
                <p>Archived</p>
                <ToggleBtn
                  isToggled={article.isArchived}
                  onClick={() =>
                    archivingUpdate(article.articleId, article.slug)
                  }
                />
              </div>
              <div className={styles.control_box}>
                <p>Published</p>
                <ToggleBtn
                  isToggled={article.isPublished}
                  onClick={() =>
                    publishingUpdate(article.articleId, article.slug)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ToggleBtn({ isToggled, onClick }) {
  return (
    <button
      className={styles.toggle_btn}
      style={{
        borderColor: isToggled ? "#0042ff" : "gray",
        background: isToggled ? "#e3eafc" : "transparent",
        transition: "background 0.2s, border-color 0.2s",
      }}
      onClick={onClick}
    >
      <div
        className={styles.toggle_btn_circle}
        style={{
          background: isToggled ? "#0042ff" : "gray",
          transform: isToggled ? "translateX(23px)" : "translateX(0)",
          transition: "background 0.2s, transform 0.2s",
        }}
      ></div>
    </button>
  );
}
