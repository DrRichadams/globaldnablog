"use client";

import styles from "./admin.module.css";
import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import LoadingComp from "@/components/loading-comp";

// Fetch user data from Firestore
async function fetchUserData(userId) {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  return userSnapshot.data();
}

export default function Layout({ children }) {
  const [user, loading] = useAuthState(auth);
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      setUserDataLoading(true);
      fetchUserData(user.uid)
        .then((data) => {
          setUserData(data);
          //   console.log("User data fetched:", data);
          setUserDataLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user]);

  if (loading) {
    return <LoadingComp message="Checking auth state..." />;
  }

  if (userDataLoading) return <LoadingComp message="Getting user data..." />;

  if (!user || userData?.userType !== "admin") {
    return <div>Access denied</div>;
  }
  return <div className={styles.admin_layout}>{children}</div>;
}
