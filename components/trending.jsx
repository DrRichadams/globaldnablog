import styles from "./trending.module.css";
import TrendingCard from "./trending_card";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import Link from "next/link";

export default async function Trending() {
  async function fetchArticles() {
    try {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const articles = [];

      querySnapshot.forEach((doc) => {
        articles.push({ id: doc.id, ...doc.data() });
      });

      // console.log("trending articles:", articles);
      return articles;
    } catch (error) {
      console.error("Error fetching documents:", error);
      return [];
    }
  }

  const articles = await fetchArticles();

  if (!articles || articles.length === 0) {
    return <p>No trending articles available.</p>;
  }

  const verifiedArticles = articles
    .filter((article) => article.isPublished && !article.isArchived)
    .sort((a, b) => (b.trendingCount || 0) - (a.trendingCount || 0));

  // console.log("Allowed articles: ", verifiedArticles);

  return (
    <div className={styles.trending_container}>
      <h2>Trending Blogs & Stories</h2>
      <div className={styles.trending_items}>
        <div className={styles.stories_blogs_container}>
          {verifiedArticles.slice(0, 4).map((article) => (
            <TrendingCard
              key={article.id}
              {...article}
              date={article.publishedOn}
            />
          ))}
        </div>
        <div className={styles.trending_side_menu}>
          <div className={styles.trending_profile}>
            <div className={styles.profile_img}>
              <img src="/assets/Herbert-Dube.jpg" alt="face" />
            </div>
            <p className={styles.profile_name}>Herbert Dube</p>
            <p className={styles.profile_title}>Global DNA official writer</p>
            <p className={styles.profile_description}>
              Every week we bring you something new, something exciting and
              something educational
            </p>
            <button className={styles.profile_btn}>CONTACT US</button>
            <div className={styles.trending_profile_socials}>
              <p>Follow:</p>
              <FaTiktok />
              <FaXTwitter />
              <SiFacebook />
            </div>
          </div>
          <div className={styles.recent_posts_listing_container}>
            <div className={styles.recent_posts_title}>
              <div></div>
              <p>Recent Posts</p>
            </div>
            <div className={styles.recent_posts_list}>
              {articles
                .filter((article) => article.isPublished && !article.isArchived)
                .sort(
                  (a, b) => new Date(b.publishedOn) - new Date(a.publishedOn)
                )
                .slice(0, 3)
                .map((article) => {
                  const date = new Date(article.publishedOn);
                  const formattedDate = date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  });

                  return (
                    <Link
                      key={article.id}
                      href={`/posts/${article.slug}`}
                      className={styles.recent_post_item}
                    >
                      <div className={styles.recent_post_img}>
                        <img
                          src={`/blog_imgs/${article.image}`}
                          alt={article.title}
                        />
                      </div>
                      <div className={styles.recent_post_details}>
                        <p className={styles.recent_post_title}>
                          {article.title}
                        </p>
                        <p className={styles.recent_post_date}>
                          {formattedDate}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              {/* END OF LIST BOX */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
