"use client";

import { useState } from "react";
import styles from "./auth.module.css";
import { BeatLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/config";
import { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
import { PuffLoader } from "react-spinners";

const SignUpForm = () => {
  const router = useRouter();
  const [signInUserWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [user, loading] = useAuthState(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Submit form to API (or Firebase, Supabase, etc.)
    await signInUserWithEmailAndPassword(email, password);
    router.push("/dashboard");
  };

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className={styles.loading}>
        <PuffLoader color="#0042ff" size={60} />
        {/* <p>Loading...</p> */}
      </div>
    );

  if (user) return null; // PREVENT FLICKER WHILE REDIRECTING

  return (
    <form onSubmit={handleSubmit} className={styles.auth_form}>
      <div className={styles.auth_form_titles}>
        <h2>Login</h2>
        <p>Write. Publish. Shine.</p>
      </div>
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError("");
        }}
      />
      {error && <p className={styles.error_box}>{error}</p>}
      <button type="submit" className={styles.auth_btn}>
        <BeatLoader color="#fff" size={8} loading={submitting} />
        {!submitting && <p>Sign In</p>}
      </button>
      <div className={styles.forgot_password_box}>
        <button type="button" onClick={() => router.push("/forgot-password")}>
          Forgot Password?
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
