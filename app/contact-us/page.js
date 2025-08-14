"use client";

import styles from "./contact.module.css";

import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Function to submit form data to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("");
    try {
      await addDoc(collection(db, "messages"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      setSubmitStatus("Message sent successfully!");
    } catch (error) {
      setSubmitStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className={styles.contacts_container}>
      {submitStatus && (
        <div
          style={{
            margin: "0 auto 1.5rem auto",
            maxWidth: 480,
            color: submitStatus.includes("successfully")
              ? "#155724"
              : "#721c24",
            background: submitStatus.includes("successfully")
              ? "#d4edda"
              : "#f8d7da",
            border: submitStatus.includes("successfully")
              ? "1.5px solid #c3e6cb"
              : "1.5px solid #f5c6cb",
            borderRadius: "0.7rem",
            padding: "1rem 1.5rem",
            fontWeight: 600,
            textAlign: "center",
            fontSize: "1.08rem",
            boxShadow: submitStatus.includes("successfully")
              ? "0 2px 8px rgba(40, 167, 69, 0.09)"
              : "0 2px 8px rgba(220, 53, 69, 0.09)",
            letterSpacing: "0.2px",
          }}
        >
          {submitStatus}
        </div>
      )}
      <h1 className={styles.contacts_title}>Contact Us</h1>
      <form className={styles.contacts_form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className={styles.contacts_submit_button} type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}
