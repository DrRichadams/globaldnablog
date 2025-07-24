import MarkdownIt from "markdown-it";
import { notFound } from "next/navigation";
import styles from "./slug.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import BackBtn from "@/components/back-btn";

const md = new MarkdownIt();

async function fetchPosts(slug) {
  try {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const articles = [];

    querySnapshot.forEach((doc) => {
      articles.push({ id: doc.id, ...doc.data() });
    });

    console.log(articles);
    //   return articles;
    // return articles.find((article) => article.slug === slug);
    return articles;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}

export default async function Post({ params }) {
  const tempPosts = await fetchPosts();
  const post = tempPosts.find((article) => article.slug === params.slug);
  const dateString = post.createdAt;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  console.log("My article post:", post.createdAt);

  if (!post) notFound();

  const recentPosts = (await fetchPosts()).sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const htmlConverter = md.render(post.article);

  return (
    <article className={styles.slug_article_container}>
      <nav style={{ marginBottom: "1.5rem" }}>
        {/* A BACK BUTTON TO GO HERE */}
        <BackBtn />
      </nav>
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
      <div className={styles.article_content}>
        <div dangerouslySetInnerHTML={{ __html: htmlConverter }} />
        <div className={styles.article_recent_posts}>
          <h2>Recent Posts</h2>
          <ul>
            {recentPosts.slice(0, 3).map((article) => (
              <li key={article.id} className={styles.recent_post_item}>
                <a href={`/posts/${article.slug}`}>
                  <img
                    src={`/blog_imgs/${article.image}`}
                    alt={article.title}
                  />
                  <div className={styles.recent_post_info}>
                    <h3>{article.title}</h3>
                    <p>Read Time: {article.readTime} mins</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
