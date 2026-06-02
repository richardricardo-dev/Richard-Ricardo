"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./project.module.css";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  category: "Web Marketplaces" | "Landing Page" | "Web Admin" | "SaaS" | "Other";
  tags: string[];
  image: string;
  desc: string;
  tech: string[];
  liveUrl?: string; /* Properti baru buat link redirect website */
}

export default function Projects() {
  const Router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Web Marketplaces", "Landing Page", "Web Admin", "SaaS", "Other"];

  const projects: Project[] = [
    {
      id: "crypto",
      title: "Rich-Crypto",
      category: "SaaS",
      tags: ["Web App", "Finance"],
      image: "/rich-crypto.png",
      desc: "A crypto tracking dashboard that fetches real-time data from the CoinGecko API. It features a sandbox Stripe payment integration for handling subscriptions, serving as a comprehensive SaaS dummy project.",
      tech: ["Next.js", "TypeScript", "API", "Google Cloud", "Supabase"],
      liveUrl: "https://rich-crypto.vercel.app/",
    },
    {
      id: "coin",
      title: "Coin-Market",
      category: "Web Marketplaces",
      tags: ["E-Commerce", "Web"],
      image: "/coin.png",
      desc: "A marketplace platform simulating buying and selling processes. It offers a seamless checkout flow with two sandbox payment methods (Bank Transfer and QRIS).",
      tech: ["Next.js", "TypeScript", "Neon", "NextAuth", "Google Cloud", "API"],
      liveUrl: "https://coin-market-black.vercel.app/",
    },
    {
      id: "coin-admin",
      title: "Coin-Market Admin",
      category: "Web Admin",
      tags: ["Web Admin", "Finance"],
      image: "/coin-admin.png",
      desc: "A dedicated admin dashboard to manage and monitor the Coin-Market platform, featuring a robust role-based access control (RBAC) system for different admin permissions.",
      tech: ["Next.js", "TypeScript", "Neon", "API", "RBAC"],
      liveUrl: "https://coin-market-admin.vercel.app/login",
    },
    {
      id: "vaultz",
      title: "Vault-Z",
      category: "Other",
      tags: ["Web App"],
      image: "/vaultz.png",
      desc: "A Pinterest-style photo sharing application that allows users to discover images. It includes user authentication and full CRUD functionalities for managing posts.",
      tech: ["Next.js", "TypeScript", "Neon", "CRUD"],
      liveUrl: "https://vault-z-uovu.vercel.app/",
    },
    {
      id: "kitchenmom",
      title: "Kitchen Moms",
      category: "Landing Page",
      tags: ["Web App"],
      image: "/kitchenmom.png",
      desc: "A beautifully crafted landing page designed to promote a local business, built entirely with clean and responsive HTML and CSS.",
      tech: ["HTML", "CSS"],
      liveUrl: "https://kitchenmoms.vercel.app/",
    },
    {
      id: "yhnz-db",
      title: "Yhnz-DB",
      category: "Landing Page",
      tags: ["Web App", "Branding"],
      image: "/landingpage.png",
      desc: "A promotional landing page for an online action figure store, highly optimized for SEO and featuring an intuitive UI/UX to effectively market products.",
      tech: ["Next.js", "SEO", "React"],
      liveUrl : "https://yhnz-db.vercel.app/"
    },
  ];

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);
  const buttonClick= () => {
    Router.push("/contact");
  }
  return (
    <div className={styles.main}>
      {/* HERO SECTION */}
      <div className={styles.hero}>
        <p className={styles.heroSub}>SELECTED WORK</p>
        <h1 className={styles.heroTitle}>
          Building products
          <br />
          that people enjoy using.
        </h1>
        <p className={styles.heroDesc}>A collection of projects I`ve worked on — from ideas to meaningful digital experiences.</p>
      </div>

      {/* FILTER TABS */}
      <div className={styles.filterContainer}>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={`${styles.filterButton} ${activeCategory === cat ? styles.filterActive : ""}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* GRID PROJECTS */}
      <motion.div layout className={styles.grid}>
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className={styles.card}
              onClick={() => setSelectedProject(project)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.imageWrapper}>
                <img src={project.image} alt={project.title} className={styles.projectImage} />
              </div>
              <div className={styles.cardInfo}>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.tags.join(" • ")}</p>
                </div>
                <div className={styles.arrowIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* MODAL PENJELASAN PROJECT CONTAINER */}
      {selectedProject && (
        <div className={styles.modalOverlay} onClick={() => setSelectedProject(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setSelectedProject(null)}>
              ✕
            </button>

            <div className={styles.modalImageWrapper}>
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className={styles.modalBody}>
              <span className={styles.modalCategory}>{selectedProject.category}</span>
              <div className={styles.modalTitleContainer}>
                <h2 className={styles.modalTitle}>{selectedProject.title}</h2>

                {/* TOMBOL REDIRECT KE WEBSITE LIVE (Hanya muncul jika liveUrl ada) */}
                {selectedProject.liveUrl && (
                  <Link href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.modalLiveButton}>
                    <b>Visit Live Website</b>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
                    </svg>
                  </Link>
                )}
              </div>
              <p className={styles.modalDesc}>{selectedProject.desc}</p>

              <div className={styles.techStack}>
                {selectedProject.tech.map((tech, index) => (
                  <span key={index} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA SECTION */}
      <div className={styles.ctaBanner}>
        <div className={styles.ctaLeft}>
          <div className={styles.ctaIconBox}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12 1a1 1 0 0 1 1 1v1.25H14.25a1 1 0 0 1 0 2H13V6.5a1 1 0 0 1-2 0V5.25H9.75a1 1 0 0 1 0-2H11V2a1 1 0 0 1 1-1m-7.5 4a.5.5 0 0 1 .5.5v1.5h1.5a.5.5 0 0 1 0 1H5v1.5a.5.5 0 0 1-1 0V8H2.5a.5.5 0 0 1 0-1H4V5.5a.5.5 0 0 1 .5-.5" />
            </svg>
          </div>
          <div>
            <h4>Have a project in mind?</h4>
            <p>Let`s create something great together.</p>
          </div>
        </div>
        <button className={styles.ctaButton} onClick={buttonClick}>
          Let`s Talk
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z" />
          </svg>
        </button>
      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>© 2026 Richard Ricardo. All rights reserved.</p>
        <div className={styles.footerLinks}>
          <a href="#linkedin" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="#github" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="#email">Email</a>
        </div>
      </footer>
    </div>
  );
}
