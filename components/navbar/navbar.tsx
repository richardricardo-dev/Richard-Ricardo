"use client";

import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { TransitionLink } from "@/components/animate/TransitionLink";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className={styles.main}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span>
            <img src="/logo.png" alt="" />
          </span>
        </div>

        <div className={styles.navLinks}>
          <TransitionLink href="/" className={pathname === "/" ? styles.active : ""}>
            Home
          </TransitionLink>
          <TransitionLink href="/projects" className={pathname === "/projects" ? styles.active : ""}>
            Projects
          </TransitionLink>
          <TransitionLink href="/contact" className={pathname === "/contact" ? styles.active : ""}>
            Contact
          </TransitionLink>
        </div>

        <button className={styles.navButton}>Resume</button>
      </nav>
    </div>
  );
}
