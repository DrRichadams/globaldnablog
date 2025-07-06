import styles from "./nav.module.css"
import Link from "next/link"


export default function Navigation(){
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
            <div className={styles.auth_sect}>
                <Link href="/"><button className={styles.auth_login}>Login</button></Link>
                <Link href="/"><button className={styles.auth_signup}>Sign up</button></Link>
            </div>
        </nav>
    )
}