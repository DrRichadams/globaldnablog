"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading</div>;

  if (!user) return null; // PREVENT FLICKER WHILE REDIRECTING
  if (error) {
    console.error("Authentication error:", error);
    return <div>Error loading dashboard</div>;
  }
  if (!user) return null; // PREVENT FLICKER WHILE REDIRECTING

  return (
    user && (
      <div className="dashboard-layout">
        <main className="dashboard-content">{children}</main>
      </div>
    )
  );
}
