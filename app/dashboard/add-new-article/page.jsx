import styles from "./new-article.module.css";

export default function NewArticle() {
  return (
    <div className={styles.new_article_container}>
      <div className={styles.author_details}>
        <div className={styles.author_details_title}>
          <h4>Author Details</h4>
        </div>
        <input type="text" placeholder="Richard Mutambisi" />
        <input type="email" placeholder="rmutambisi98@gmail.com" disabled />
        <input type="text" placeholder="342342435243" disabled />
      </div>
    </div>
  );
}
