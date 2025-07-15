import styles from "./trending.module.css"
import TrendingCard from "./trending_card"
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";



export default function Trending() {
    return(
        <div className={styles.trending_container}>
            <h2>Trending Blogs & Stories</h2>
            <div className={styles.trending_items}>
                <div className={styles.stories_blogs_container}>
                    <TrendingCard />
                    <TrendingCard />
                    <TrendingCard />
                    <TrendingCard />
                </div>
                <div className={styles.trending_side_menu}>
                    <div className={styles.trending_profile}>
                        <div className={styles.profile_img}>
                            <img src="/assets/face1.jpg" alt="face" />
                        </div>
                        <p className={styles.profile_name}>Boris Ngwere</p>
                        <p className={styles.profile_title}>Global DNA official writer</p>
                        <p className={styles.profile_description}>
                            Every week we bring you something
                            new, something exciting and 
                            something
                            educational
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
                            {/* START OF LIST BOX */}
                            <div className={styles.recent_post_box}>
                                <div className={styles.recent_post_img_box}><img src="/assets/blog_pic1.jpg" alt="" /></div>
                                <div className={styles.recent_post_details}>
                                    <h5>Most marriages are shakey because of lack of trust</h5>
                                    <p>15 April 2025</p>
                                </div>
                            </div>
                            {/* END OF LIST BOX */}
                            {/* START OF LIST BOX */}
                            <div className={styles.recent_post_box}>
                                <div className={styles.recent_post_img_box}><img src="/assets/blog_pic1.jpg" alt="" /></div>
                                <div className={styles.recent_post_details}>
                                    <h5>Most marriages are shakey because of lack of trust</h5>
                                    <p>15 April 2025</p>
                                </div>
                            </div>
                            {/* END OF LIST BOX */}
                            {/* START OF LIST BOX */}
                            <div className={styles.recent_post_box}>
                                <div className={styles.recent_post_img_box}><img src="/assets/blog_pic1.jpg" alt="" /></div>
                                <div className={styles.recent_post_details}>
                                    <h5>Most marriages are shakey because of lack of trust</h5>
                                    <p>15 April 2025</p>
                                </div>
                            </div>
                            {/* END OF LIST BOX */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}