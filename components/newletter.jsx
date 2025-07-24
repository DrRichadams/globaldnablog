import styles from "./newletter.module.css";

export default function NewLetter() {
  return (
    <div className={styles.newsletter_container}>
      <h2 className={styles.newsletter_title}>Subscribe to our Newsletter</h2>
      <p className={styles.newsletter_description}>
        Stay updated with the latest news and articles.
      </p>
      <form className={styles.newsletter_form}>
        <input
          type="email"
          className={styles.newsletter_input}
          placeholder="Enter your email"
          required
        />
        <button type="submit" className={styles.newsletter_button}>
          Subscribe
        </button>
      </form>
    </div>
  );
}
