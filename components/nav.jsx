"use client";

import styles from "./nav.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { IoIosCloseCircle } from "react-icons/io";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

export default function Navigation() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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

  const mobileNavigate = (route) => {
    setMobileNavOpen(false);
    router.push(route);
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
          <Link href="/blogs">Blogs</Link>
        </li>
        <li>
          <Link href="/contact-us">Contact us</Link>
        </li>
      </ul>
      {!loading && user ? (
        <div className={styles.user_section}>
          <Link href="/dashboard">
            <div className={styles.dashboard_link}>
              <span style={{ fontSize: "1.2em", lineHeight: 1 }}>🏠</span>{" "}
              Dashboard
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
      <div
        className={styles.mobile_nav}
        style={{ display: mobileNavOpen ? "flex" : "none" }}
      >
        <button className={styles.mobile_nav_toggle}>
          <IoIosCloseCircle
            size={25}
            onClick={() => setMobileNavOpen((prev) => !prev)}
          />
        </button>
        <ul>
          <li onClick={() => mobileNavigate("/")}>Home</li>
          <li onClick={() => mobileNavigate("/posts")}>Blogs</li>
          <li onClick={() => mobileNavigate("/contact-us")}>Contact us</li>
        </ul>
        <div className={styles.user_auth_state}>
          {user ? (
            <button
              onClick={handleSignout}
              className={styles.logout_btn_mobile}
            >
              Logout
            </button>
          ) : (
            <div className={styles.auth_sect_mobile}>
              <Link href="/sign-in" onClick={() => setMobileNavOpen(false)}>
                <button className={styles.auth_login_mobile}>Login</button>
              </Link>
              <Link href="/sign-up" onClick={() => setMobileNavOpen(false)}>
                <button className={styles.auth_signup_mobile}>Sign up</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <HiOutlineMenuAlt3
        size={30}
        onClick={() => setMobileNavOpen((prev) => !prev)}
        className={styles.mobile_nav_icon}
      />
    </nav>
  );
}
