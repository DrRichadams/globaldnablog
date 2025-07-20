import styles from "./trending.module.css";
import { MdOutlineArrowOutward } from "react-icons/md";
import Link from "next/link";

export default function TrendingCard({
  image,
  title,
  date,
  article,
  category,
  slug,
}) {
  return (
    <div className={styles.trending_card_container}>
      <div className={styles.img_box}>
        <img src={`/blog_imgs/${image}`} alt={title} />
      </div>
      <div className={styles.details_box}>
        <div className={styles.small_titles_box}>
          <div className={styles.blog_type_box}>
            <div></div>
            <p>{category}</p>
          </div>
          <div className={styles.date_box}>
            <div></div>
            <p>
              {new Date(date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <h3>{title}</h3>
        <p className={styles.card_story}>
          {(() => {
            const cleanArticle = article.replace(/[^\w\s.,]/g, "");
            return cleanArticle.length > 100
              ? `${cleanArticle.substring(0, 100)}...`
              : cleanArticle;
          })()}
        </p>
        <div className={styles.blog_card_btn}>
          <Link href={`/posts/${slug}`}>
            <button>
              <p>Continue reading</p>
              <MdOutlineArrowOutward size={20} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
