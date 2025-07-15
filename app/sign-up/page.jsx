'use client'

import { useState } from 'react';
import styles from './auth.module.css';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    // Submit form to API (or Firebase, Supabase, etc.)
  };

  return (
    <form onSubmit={handleSubmit} className={styles.auth_form}>
        <div className={styles.auth_form_titles}>
            <h2>Create a new account</h2>
            <p>Become a writer today</p>
        </div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Repeat password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      {error && <p className={styles.error_box}>{error}</p>}
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
