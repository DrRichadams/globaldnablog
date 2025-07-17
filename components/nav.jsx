'use client'

import styles from "./nav.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { auth } from "@/app/firebase/config"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"


export default function Navigation(){  
    const [user, loading] = useAuthState(auth)
    const router = useRouter()

    const handleSignout = async () => {
        try {
            await signOut(auth)
            router.push("/sign-in")
        } catch (err) {
            console.error("Logout failed: ", err.message)
        }
    }

    return(
        <nav className={styles.nav_container}>
            <div className={styles.logos}>
                <img src="/logos/globaldnalogo.png" alt="Global DNA Logo" />
            </div>
            <ul className={styles.nav_links}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/">Blogs</Link></li>
                <li><Link href="/">Contact us</Link></li>
            </ul>
            {!loading && user ? <button onClick={() => handleSignout()} className={styles.logout_btn}>Logout</button>:
            (
                <div className={styles.auth_sect}>
                    <Link href="/sign-in"><button className={styles.auth_login}>Login</button></Link>
                    <Link href="/sign-up"><button className={styles.auth_signup}>Sign up</button></Link>
                </div>
                )}
        </nav>
    )
}