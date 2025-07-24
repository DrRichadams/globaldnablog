import styles from "./articles.module.css";
import { FaRegCalendar } from "react-icons/fa6";

export default function Article_Card(props) {
  const { title, readTime, date, image } = props;
  console.log("Article_Card props:", props);
  return (
    <div className={styles.article_card_container}>
      <div className={styles.card_img_box}>
        {/* <div>Paternity fraud</div> */}
        <img src={`/blog_imgs/${image}`} alt={title} />
      </div>
      <div className={styles.article_card_details_box}>
        <div className={styles.article_card_date}>
          <FaRegCalendar />
          <p>{date}</p>
        </div>
        <p>{title}</p>
        <div className={styles.article_card_time}>
          <div></div>
          <p>{readTime} min read</p>
        </div>
      </div>
    </div>
  );
}
