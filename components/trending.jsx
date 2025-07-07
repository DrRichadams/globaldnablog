import styles from "./trending.module.css"
import TrendingCard from "./trending_card"

export default function Trending() {
    return(
        <div className={styles.trending_container}>
            <h2>Trending Blogs & Stories</h2>
            <div className={styles.stories_blogs_container}>
                <TrendingCard />
            </div>
            <div className={styles.trending_side_menu}></div>
        </div>
    )
}