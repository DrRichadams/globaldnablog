'use client'

import { useState } from 'react';
import styles from './auth.module.css';
import { BeatLoader } from "react-spinners";
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  useCreateUserWithEmailAndPassword, useAuthState
} from "react-firebase-hooks/auth"
import { auth, db } from '../firebase/config';
import { useEffect } from "react";

import { doc, setDoc } from 'firebase/firestore';

const SignUpForm = () => {
  const router = useRouter();
  // const [ createUser ] = useCreateUserWithEmailAndPassword(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
   const [ submitting, setSubmitting ] = useState(false)
     const [user, loading] = useAuthState(auth)

  const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords mismatch, please try again");
      return;
    }

    // Submit form to API (or Firebase, Supabase, etc.)
    setSubmitting(true)
    // await createUser(email, password);
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredentials.user;
      
      // Storing user in database
      await saveUserToFirestore(user.uid, user.email)
      console.log("User signed up and stored")
      router.push("/dashboard")
    } catch (err){
      console.error(err.message)
    }
  };

  useEffect(() => {
      if(!loading && user) {
          router.push("/dashboard");
      }
  }, [user, loading, router])

  if(loading) return <div>Loading</div>

  if(user) return null; // PREVENT FLICKER WHILE REDIRECTING

  const saveUserToFirestore = async (uid, email) => {
    try {
      await setDoc(doc(db, 'users', uid), {
        uid: uid,
        email: email,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Failed to write user to Firestore:', err.message);
    }
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
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        required
        value={password}
        onChange={(e) => {setPassword(e.target.value); setError("")}}
      />
      <input
        type="password"
        placeholder="Repeat password"
        required
        value={passwordConfirm}
        onChange={(e) => {setPasswordConfirm(e.target.value); setError("")}}
      />
      {error && <p className={styles.error_box}>{error}</p>}
      <button type="submit">
        <BeatLoader 
            color='#fff'
            size={8}
            loading={submitting}
        />
        { !submitting && <p>Sign Up</p> }
      </button>
    </form>
  );
};

export default SignUpForm;
