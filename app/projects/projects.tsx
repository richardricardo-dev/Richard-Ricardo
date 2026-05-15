import styles from "./project.module.css";

import Link from "next/link";
export default function Projects() {
  return (
    <div className={styles.main}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span>
            <img src="/logo.png" alt="" />
          </span>
        </div>

        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <button className={styles.navButton}>Resume</button>
      </nav>
      <div className={styles.hero}>
        <p>SELECTED WORK</p>

        <h1>
          Building products
          <br />
          that people enjoy using.
        </h1>
      </div>
    </div>
  );
}
