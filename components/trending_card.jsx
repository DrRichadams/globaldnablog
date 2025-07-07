import styles from "./trending.module.css";
import { MdOutlineArrowOutward } from "react-icons/md";


export default function TrendingCard() {
    return(
        <div className={styles.trending_card_container}>
            <div className={styles.img_box}>
                <img src="/assets/blog_pic1.jpg" alt="Blog Pic" />
            </div>
            <div className={styles.details_box}>
                <div className={styles.small_titles_box}>
                    <div className={styles.blog_type_box}>
                        <div></div>
                        <p>DNA Testing</p>
                    </div>
                    <div className={styles.date_box}>
                        <div></div>
                        <p>24 June 2025</p>
                    </div>
                </div>
                <h3>The Power of Knowing: <br/>Paternity DNA Testing Explained</h3>
                <p className={styles.card_story}>
                    Paternity DNA testing is more than just science—it's about truth, identity, 
                    and peace of mind. Whether it's for legal reasons, child support, or simply 
                    personal clarity, knowing the biological father of a child has life-changing
                    implications for all involved.
                </p>
                <div className={styles.blog_card_btn}>
                    <button>
                        <p>Continue reading</p>
                        <MdOutlineArrowOutward size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}