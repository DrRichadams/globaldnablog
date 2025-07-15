import styles from "./articles.module.css"
import { FaRegCalendar } from "react-icons/fa6";


export default function Article_Card() {
    return(
        <div className={styles.article_card_container}>
            <div className={styles.card_img_box}>
                <div>Paternity fraud</div>
                <img src="/assets/blog_pic1.jpg" alt="Blog pic" />
            </div>
            <div className={styles.article_card_details_box}>
                <div className={styles.article_card_date}>
                    <FaRegCalendar />
                    <p>28 June 2025</p>
                </div>
                <p>Victims of paternity fraud from all corners of Africa, real time statistics</p>
                <div className={styles.article_card_time}>
                    <div></div>
                    <p>13 min read</p>
                </div>
            </div>
        </div>
    )
}