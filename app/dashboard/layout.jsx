"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { usePathname } from "next/navigation";
import { PiSealWarningFill } from "react-icons/pi";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Layout({ children }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [curUser, setCurUser] = useState(null);
  const [curUserInfo, setCurUserInfo] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [disabledMessage, setDisabledMessage] = useState("");
  const [errorBox, setErrorBox] = useState(false);
  const pathname = usePathname();

  // console.log("Current pathname:", pathname);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
      // return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setCurUser(firebaseUser);

      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("User daata:", docSnap.data());
          setCurUserInfo(docSnap.data());
        } else {
          console.log("No such user in Firestore");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // console.log("The currr user data: ", curUserInfo);
    // console.log("The currr auth user data: ", curUser);

    if (curUserInfo) {
      if (curUserInfo.isSuspended) {
        setIsDisabled(true);
        setErrorBox(true);
        setDisabledMessage(
          "You have been suspended from creating new articles"
        );
      } else {
        setIsDisabled(false);
        setDisabledMessage("");
        setErrorBox(false);
      }
      if (!curUserInfo.isApproved) {
        setIsDisabled(true);
        setErrorBox(true);
        setDisabledMessage(
          "You are not yet elligible to write articles, wait for the admin to approve you."
        );
      }
    }
  }, [curUserInfo, curUser]);

  if (loading) return <div>Loading</div>;

  if (!user) return null; // PREVENT FLICKER WHILE REDIRECTING
  if (error) {
    console.error("Authentication error:", error);
    return <div>Error loading dashboard</div>;
  }
  if (!user) return null; // PREVENT FLICKER WHILE REDIRECTING

  return (
    user && (
      <div className={styles.dashboard_layout}>
        {errorBox ? (
          <div className={styles.dashboard_warning_box}>
            <PiSealWarningFill size={25} />
            <p>{disabledMessage}</p>
          </div>
        ) : (
          ""
        )}
        {!pathname.includes("/dashboard/add-new-article") && (
          <div
            className={styles.dashboard_side_menu}
            style={{
              pointerEvents: isDisabled ? "none" : "auto",
              opacity: isDisabled ? 0.5 : 1,
            }}
          >
            <button
              className={styles.add_article_btn}
              onClick={() => router.push("/dashboard/add-new-article")}
              disabled={isDisabled}
            >
              <p>Create an article</p>
              {/* <IoAddCircleOutline size={25} /> */}
            </button>
            <div className={styles.dashboard_side_menu_items}>
              <h3>Admin options</h3>
              <div className={styles.dashboard_side_menu_btns_box}>
                <button
                  onClick={() => router.push("/dashboard")}
                  disabled={isDisabled}
                >
                  <p>Unpublished articles</p>
                  {/* <FaArrowUpRightFromSquare size={20} /> */}
                </button>
                <button
                  onClick={() => router.push("/dashboard/published-articles")}
                  disabled={isDisabled}
                >
                  <p>Published articles</p>
                  {/* <FaArrowUpRightFromSquare size={20} /> */}
                </button>
              </div>
            </div>
          </div>
        )}
        <main className={styles.dashboard_content}>{children}</main>
      </div>
    )
  );
}
