"use client";

import styles from "./admin.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../firebase/config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

// Fetch users from Firestore
async function fetchUsersFromFirestore() {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  return usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default function AdminPage() {
  const [authors, setAuthors] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(false);

  useEffect(() => {
    async function loadAuthors() {
      setLoadingAuthors(true);
      try {
        const users = await fetchUsersFromFirestore();
        setAuthors(users);
      } catch (err) {
        setAuthors([]);
      }
      setLoadingAuthors(false);
    }
    loadAuthors();
  }, []);

  return (
    <div className={styles.admin_page_container}>
      <h2>ADMIN DASHBOARD</h2>
      <div className={styles.admin_stats}>
        <Link href="/admin/users" className={styles.admin_box}>
          <h3>Users</h3>
          <div className={styles.admin_stats_box}>
            <div>
              <p>Approved</p>
              <p>20</p>
            </div>
            <div>
              <p>Waiting Approval</p>
              <p>13</p>
            </div>
            <div>
              <p>Suspended</p>
              <p>8</p>
            </div>
            <div>
              <p>Total</p>
              <p>41</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/articles" className={styles.admin_box}>
          <h3>Articles</h3>
          <div className={styles.admin_stats_box}>
            <div>
              <p>Published</p>
              <p>50</p>
            </div>
            <div>
              <p>Waiting to publish</p>
              <p>10</p>
            </div>
            <div>
              <p>Deleted</p>
              <p>5</p>
            </div>
            <div>
              <p>Total</p>
              <p>65</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
