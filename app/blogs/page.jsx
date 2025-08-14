"use client";

import styles from "./blogs.module.css";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { db } from "../firebase/config";
import Link from "next/link";
import LoadingComp from "@/components/loading-comp";
import Article_Card from "@/components/article_card";

export default function Blogs() {
  function useFetchBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchBlogs() {
        try {
          const querySnapshot = await getDocs(collection(db, "articles"));
          const articles = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setBlogs(articles);
        } catch (error) {
          setBlogs([]);
        } finally {
          setLoading(false);
        }
      }
      fetchBlogs();
    }, []);

    return { blogs, loading };
  }

  const { blogs, loading } = useFetchBlogs();

  if (loading) {
    return <LoadingComp />;
  }

  if (!blogs.length) {
    return <div className={styles.empty}>No articles found.</div>;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  }

  return (
    <div className={styles.blogs_main_container}>
      <div className={styles.blogs_titles}>
        <h2>Words That Matter</h2>
        <p>
          Inspiring fresh perspectives, informing curious minds, and igniting
          conversations that spark change.
        </p>
      </div>
      <div className={styles.blogs_container}>
        {blogs.map((blog) => (
          <Link
            href={`/blogs/${blog.id}`}
            key={blog.id}
            className={styles.blog_card}
          >
            <div className={styles.blog_item}>
              <img
                src={`/blog_imgs/${blog.image}`}
                alt={blog.title}
                className={styles.blog_img}
              />
              <h2 className={styles.blog_title}>{blog.title}</h2>
              <span className={styles.blog_date}>
                {formatDate(blog.publishedOn)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
