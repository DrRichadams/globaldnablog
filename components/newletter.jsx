import styles from "./newletter.module.css";

export default function NewLetter() {
  return (
    <div className={styles.newsletter_container}>
      <h2>Subscribe to our Newsletter</h2>
      <p>Stay updated with the latest news and articles.</p>
      <form>
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
}
