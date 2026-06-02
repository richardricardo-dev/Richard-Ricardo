"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { TransitionLink } from "@/components/animate/TransitionLink";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        <div className={styles.rightSection}>
          <a href="/Richard Ricardo-CV.pdf" download="Richard_Ricardo_CV.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} className={styles.desktopResume}>
            <button className={styles.navButton}>Resume</button>
          </a>

          <button className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={styles.mobileMenu}
          >
            <TransitionLink href="/" className={pathname === "/" ? styles.activeMobile : ""} onClick={() => setIsMenuOpen(false)}>
              Home
            </TransitionLink>
            <TransitionLink href="/projects" className={pathname === "/projects" ? styles.activeMobile : ""} onClick={() => setIsMenuOpen(false)}>
              Projects
            </TransitionLink>
            <TransitionLink href="/contact" className={pathname === "/contact" ? styles.activeMobile : ""} onClick={() => setIsMenuOpen(false)}>
              Contact
            </TransitionLink>
            <a href="/Richard Ricardo-CV.pdf" download="Richard_Ricardo_CV.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className={styles.navButtonMobile} onClick={() => setIsMenuOpen(false)}>Resume</button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
