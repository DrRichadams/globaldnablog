'use client';

import styles from "./articles.module.css";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import Article_Card from "./article_card";

export default function Articles(){
    const [ active_type, setActive_type ] = useState(1)
    return(
        <div className={styles.articles_container}>
            <div className={styles.articles_menu}>
                <div className={styles.articles_menu_items}>
                    <div className={styles.articles_menu_title}>All Articles</div>
                    <ul>
                        <li onClick={() => setActive_type(1)} className={active_type == 1 ? `${styles.menu_item_active}`:`${styles.menu_item_inactive}`}>Paternity Fraud</li>
                        <li onClick={() => setActive_type(2)} className={active_type == 2 ? `${styles.menu_item_active}`:`${styles.menu_item_inactive}`}>DNA Testing</li>
                        <li onClick={() => setActive_type(3)} className={active_type == 3 ? `${styles.menu_item_active}`:`${styles.menu_item_inactive}`}>DNA Technology</li>
                    </ul>
                </div>
                <form className={styles.articles_munu_search_box}>
                    <input type="text" placeholder="Search what you want" />
                    <FiSearch size={26} />
                </form>
            </div>
            <div className={styles.articles_listing}>
                <Article_Card />
                <Article_Card />
                <Article_Card />
                <Article_Card />
                <Article_Card />
                <Article_Card />
            </div>
        </div>
    )
}