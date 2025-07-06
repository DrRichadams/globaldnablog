import styles from "./banner.module.css"


export default function Banner() {
    return(
        <div className={styles.banner_container}>
            <div className={styles.banner_titles}>
                <h1 className={styles.banner_tag}>#Global DNA International Blog</h1>
                <h2 className={styles.main_banner_title}>
                    DNA Stories and articles:
                    Exploring the Power of Genetic Science
                </h2>
                <p className={styles.banner_description}>
                    At Global DNA, we go beyond the science to bring you powerful stories,
                    expert insights, and thought-provoking articles that explore the true impact
                    of DNA diagnostics.
                </p>
                <button className={styles.cta2}>Become a writer</button>
            </div>
            <div className={styles.banner_img_box}>
                <img src="/assets/banner.jpg" alt="" />
                {/* HEELLO */}
            </div>
        </div>
    )
}