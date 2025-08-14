"use client";

import styles from "./newletter.module.css";
import { useState, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { db } from "@/app/firebase/config";
import { PacmanLoader } from "react-spinners";

export default function NewLetter() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function addEmailToFirestore(email) {
    try {
      await addDoc(collection(db, "newsletter_emails"), {
        email: email,
        subscribedAt: new Date(),
        hasPermission: true,
      });
      setError(null);
      setSuccess("Congratulations, You have been added to our mailing list!");
    } catch (error) {
      setSuccess(null);
      setError("Error! Something went wrong, please try again");
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await addEmailToFirestore(newsletterEmail);
    setLoading(false);
    setNewsletterEmail("");
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 10000);
  }
  return (
    <div className={styles.newsletter_container}>
      <h2 className={styles.newsletter_title}>Subscribe to our Newsletter</h2>
      <p className={styles.newsletter_description}>
        Stay updated with the latest news and articles.
      </p>
      <form
        className={styles.newsletter_form}
        onSubmit={(e) => handleSubmit(e)}
      >
        {error ||
          (success && (
            <div
              className={styles.messagebox}
              style={{
                backgroundColor: error ? "#ffcccc" : "#99fbabff", // #ffcccc is a light reddish color
                color: error ? "#a94442" : "#155724",
              }}
            >
              <p>{error && !success && error}</p>
              <p>{success && !error && success}</p>
            </div>
          ))}
        <input
          type="email"
          className={styles.newsletter_input}
          placeholder="Enter your email"
          required
          value={newsletterEmail}
          onChange={(e) => setNewsletterEmail(e.target.value)}
        />
        <button
          type="submit"
          className={styles.newsletter_button}
          disabled={loading}
          style={{
            backgroundColor: loading ? "#bcffa6ff" : "#0042ff",
            color: loading ? "#259600ff" : "#ffffffff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {!loading && <p>Subscribe</p>}
          {loading && <PacmanLoader color="#3bad15ff" size={15} />}
        </button>
      </form>
    </div>
  );
}
