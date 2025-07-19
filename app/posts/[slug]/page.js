import { getAllPosts } from "@/llib/posts";
import MarkdownIt from "markdown-it";
import { notFound } from "next/navigation";
import styles from "./slug.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const md = new MarkdownIt();

async function fetchPosts(slug) {
  try {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const articles = [];

    querySnapshot.forEach((doc) => {
      articles.push({ id: doc.id, ...doc.data() });
    });

    // console.log(articles);
    //   return articles;
    return articles.find((article) => article.slug === slug);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}

export default async function Post({ params }) {
  const post = await fetchPosts(params.slug);
  const dateString = post.createdAt;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  console.log("My article post:", post.createdAt);

  if (!post) notFound();

  const htmlConverter = md.render(post.article);

  return (
    <article className={styles.slug_article_container}>
      <div className={styles.article_header}>
        <p className={styles.article_date}>Published, {formattedDate}</p>
        <h1 className={styles.article_title}>{post.title}</h1>
        <p className={styles.article_description}>
          Global DNA International brings you thought-provoking stories and
          insightful articles designed to satisfy your curiosity and deepen your
          understanding of DNA testing, genetic identity, and the complex issues
          surrounding modern DNA science.
        </p>
        <div className={styles.article_tags}>
          <p>DNA Stories</p>
          <p>DNA Technology</p>
          <p>Paternity Fraud</p>
        </div>
      </div>
      <img
        src={`/blog_imgs/${post.image}`}
        alt={post.title}
        className={styles.article_image}
      />
      <div dangerouslySetInnerHTML={{ __html: htmlConverter }} />
    </article>
  );
}
