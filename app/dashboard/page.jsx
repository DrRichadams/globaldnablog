"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./dashboard.module.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Article_Card from "@/components/article_card";
import { FaRegCalendar } from "react-icons/fa6";

export default function Dashboard() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading</div>;

  if (!user) return null; // PREVENT FLICKER WHILE REDIRECTING

  return (
    user && (
      <div className={styles.dashboard_container}>
        <div className={styles.dashboard_side_menu}>
          <button
            className={styles.add_article_btn}
            onClick={() => router.push("/dashboard/add-new-article")}
          >
            <p>Create an article</p>
            <IoAddCircleOutline size={25} />
          </button>
          <div className={styles.dashboard_side_menu_items}>
            <h3>Admin options</h3>
            <div className={styles.dashboard_side_menu_btns_box}>
              <button>
                <p>Published articles</p>
                <FaArrowUpRightFromSquare size={20} />
              </button>
              <button>
                <p>Unpublished articles</p>
                <FaArrowUpRightFromSquare size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.dashboard_articles_list}>
          <h3 className={styles.dashboard_main_title}>Published articles</h3>
          <div className={styles.dashboard_articles}>
            <Article_Card />
            <Article_Card />
            <Article_Card />
            <Article_Card />
            <Article_Card />
            <Article_Card />
          </div>
        </div>
      </div>
    )
  );
}
