"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./project.module.css";

interface Project {
  id: string;
  title: string;
  category: "Web Apps" | "Mobile Apps" | "UI / UX" | "Other";
  tags: string[];
  image: string;
  desc: string;
  tech: string[];
  liveUrl?: string; /* Properti baru buat link redirect website */
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["All", "Web Apps", "Mobile Apps", "UI / UX", "Other"];

  const projects: Project[] = [
    {
      id: "crypto",
      title: "Rich-Crypto",
      category: "Web Apps",
      tags: ["Web App", "Finance"],
      image: "/rich-crypto.png",
      desc: "A comprehensive real-time financial dashboard tracking active metrics, transaction flows, and user retention analysis with optimized server-side actions.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
      liveUrl: "https://fintrack.richardricardo.dev" /* Ganti pake link aslimu */,
    },
    {
      id: "coin",
      title: "Coin-Market",
      category: "Web Apps",
      tags: ["E-Commerce", "Web"],
      image: "/coin.png",
      desc: "A luxury minimalist e-commerce storefront designed with clean layout structures, fast page response times, and premium product display animations.",
      tech: ["React", "TypeScript", "PostgreSQL", "CSS Modules"],
      liveUrl: "https://aurora.richardricardo.dev",
    },
    {
      id: "coin-admin",
      title: "Coin-Market Admin",
      category: "Web Apps",
      tags: ["Mobile App", "Health"],
      image: "/coin-admin.png",
      desc: "A dark-themed premium fitness tracking application crafted to monitor physical progress, training schedules, and strict dietary workflows.",
      tech: ["React Native", "TypeScript", "Expo", "Redux Toolkit"],
      liveUrl: "https://github.com/richardricardo/move-app" /* Bisa diarahin ke github klo mobile app */,
    },
    {
      id: "vaultz",
      title: "Vault-Z",
      category: "Web Apps",
      tags: ["Web App", "Travel"],
      image: "/vaultz.png",
      desc: "An immersive travel itinerary planning tool that helps remote workers and digital nomads structure global workflows smoothly.",
      tech: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
      liveUrl: "https://wanderly.richardricardo.dev",
    },
    {
      id: "kitchenmom",
      title: "Kitchen Moms",
      category: "Web Apps",
      tags: ["Web App", "Productivity"],
      image: "/kitchenmom.png",
      desc: "A minimal workspace organizer utilizing custom state management paradigms to group project sprints and development tasks elegantly.",
      tech: ["React", "TypeScript", "Zustand", "CSS Modules"],
      liveUrl: "https://taskly.richardricardo.dev",
    },
    {
      id: "studio-k",
      title: "Studio K",
      category: "UI / UX",
      tags: ["Web", "Branding"],
      image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600&auto=format&fit=crop",
      desc: "Design system exploration and digital agency portfolio structure focusing heavily on micro-interactions, clean glassmorphism layers, and pristine layout scales.",
      tech: ["Figma", "Canva Pro", "Design System"],
    },
  ];

  const filteredProjects = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

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
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <button className={styles.navButton}>Resume</button>
      </nav>

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
      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <div key={project.id} className={styles.card} onClick={() => setSelectedProject(project)} style={{ cursor: "pointer" }}>
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
          </div>
        ))}
      </div>

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
        <button className={styles.ctaButton}>
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
