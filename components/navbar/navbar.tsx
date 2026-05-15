import styles from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className={styles.main}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span>R</span>
        </div>

        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <button className={styles.navButton}>Resume</button>
      </nav>
    </div>
  );
}
