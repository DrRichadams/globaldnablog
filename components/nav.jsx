"use client";

import styles from "./nav.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export default function Navigation() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const handleSignout = async () => {
    try {
      await signOut(auth);
      router.push("/sign-in");
    } catch (err) {
      console.error("Logout failed: ", err.message);
    }
  };

  return (
    <nav className={styles.nav_container}>
      <div className={styles.logos}>
        <img src="/logos/globaldnalogo.png" alt="Global DNA Logo" />
      </div>
      <ul className={styles.nav_links}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/">Blogs</Link>
        </li>
        <li>
          <Link href="/">Contact us</Link>
        </li>
      </ul>
      {!loading && user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', zIndex: 2 }}>
          <Link href="/dashboard">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.7em',
              background: '#f4faff',
              color: '#0042ff',
              padding: '0.4em 1.2em',
              borderRadius: '999px',
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 1px 4px rgba(0,66,255,0.07)',
              cursor: 'pointer',
              transition: 'background 0.18s, color 0.18s',
            }}>
              <span style={{ fontSize: '1.2em', lineHeight: 1 }}>🏠</span> Dashboard
            </div>
          </Link>
          <button onClick={handleSignout} className={styles.logout_btn}>
            Logout
          </button>
        </div>
      ) : (
        <div className={styles.auth_sect}>
          <Link href="/sign-in">
            <button className={styles.auth_login}>Login</button>
          </Link>
          <Link href="/sign-up">
            <button className={styles.auth_signup}>Sign up</button>
          </Link>
        </div>
      )}
    </nav>
  );
}
