"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./story.module.css";
import { SiNextdotjs, SiReact, SiTypescript, SiPostgresql, SiPrisma } from "react-icons/si";

import { TbBrandFramerMotion } from "react-icons/tb";
import Link from "next/link";

export default function Story() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=3500", // 🔥 shorter = no more “stuck” feeling
          scrub: 1, // smoother
          pin: true,
        },
      });

      // 👉 HERO → fade out
      tl.to(".hero-text", {
        opacity: 0,
        y: -100,
        duration: 1,
        ease: "none",
      })
        .to(
          ".hero-img",
          {
            opacity: 0,
            scale: 1.1,
            duration: 1,
            ease: "none",
          },
          "<",
        )

        // 👉 ABOUT
        .fromTo(".about", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, ease: "none" })
        .fromTo(".about-img", { opacity: 0, x: 200, scale: 0.9 }, { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power2.out" }, "<")
        // 👉 SKILLS
        .to(".about", { opacity: 0, y: -100, duration: 1 })
        .to(".about-img", { opacity: 0, duration: 1 }, "<")
        .fromTo(".skills", { opacity: 0 }, { opacity: 1, duration: 1, pointerEvents: "all" })

        // CTA
        .to(".skills", {
          opacity: 0,
          duration: 0.5,
        })

        .fromTo(
          ".cta",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.7,
            pointerEvents: "all",
          },
        )

        .from(
          ".cta-badge",
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
          },
          "<",
        )

        .from(
          ".cta-title",
          {
            opacity: 0,
            y: 35,
            duration: 0.5,
          },
          "-=.2",
        )

        .from(
          ".cta-desc",
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
          },
          "-=.3",
        )

        .fromTo(
          ".cta-button",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=.25",
        )

        .from(
          ".preview-card",
          {
            opacity: 0,
            scale: 0.95,
            y: 30,
            stagger: 0.08,
            duration: 0.6,
          },
          "-=.4",
        )
        // 👉 CONTACT
        .to(".cta", { opacity: 0, duration: 1 })
        .fromTo(".contact", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1 });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="min-h-screen w-full  text-white relative overflow-hidden flex items-center justify-between px-45">
      {/* HERO */}
      <div className="hero-text max-w-xl z-10">
        <h1 className={styles.heroTitle}>
          Hello There! <br /> I’m Richard
        </h1>
        <p className="mt-6 text-lg opacity-60">I build modern, fast and responsive web experiences.</p>
        <Link href={"/projects"}>
          <Button>Explore My Work →</Button>
        </Link>
      </div>

      <div className="hero-img relative flex items-center justify-center">
        <img src="/saya2.png" className={styles.heroImg} />
      </div>

      {/* ABOUT */}
      <div className="about absolute inset-0 flex items-center justify-between px-40 opacity-0 pointer-events-none">
        <img src="/sayatapiai.png" className={styles.imageAbout} />
        <div className={styles.about_container}>
          <h2 className={styles.aboutTitle}>I’m a Developer who passionate building fast, modern and responsive web experiences.</h2>
          <div className={styles.aboutContent}>I’m a fullstack developer focused on building modern, scalable and immersive web applications using Next.js, React and modern backend technologies.</div>
          <div className={styles.aboutStats}>
            <div className={styles.statItem}>
              <h3>1+</h3>
              <p>Years Experiences</p>
            </div>

            <div className={styles.statItem}>
              <h3>5+</h3>
              <p>Projects Created</p>
            </div>

            <div className={styles.statItem}>
              <h3>∞</h3>
              <p>Passion For Building</p>
            </div>
          </div>
        </div>
      </div>

      {/* SKILLS */}
      <div className="skills absolute inset-0 z-20 opacity-0 pointer-events-none">
        {" "}
        <div className={styles.skillsContainer}>
          <p className={styles.skillsLabel}>MY STACK</p>

          <h2 className={styles.skillsTitle}>Building immersive web experiences with modern technologies.</h2>

          <div className={styles.skillsTech}>
            <div className={styles.techItem}>
              <SiNextdotjs className={styles.smallIcon} />

              <span className={styles.techText}>Next.js</span>

              <SiNextdotjs className={styles.bigIcon} />
            </div>

            <div className={styles.techItem}>
              <SiReact className={styles.smallIcon} />

              <span className={styles.techText}>React</span>

              <SiReact className={styles.bigIcon} />
            </div>

            <div className={styles.techItem}>
              <SiTypescript className={styles.smallIcon} />

              <span className={styles.techText}>TypeScript</span>

              <SiTypescript className={styles.bigIcon} />
            </div>

            <div className={styles.techItem}>
              <SiPrisma className={styles.smallIcon} />

              <span className={styles.techText}>Prisma</span>

              <SiPrisma className={styles.bigIcon} />
            </div>

            <div className={styles.techItem}>
              <SiPostgresql className={styles.smallIcon} />

              <span className={styles.techText}>PostgreSQL</span>

              <SiPostgresql className={styles.bigIcon} />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta absolute inset-0 flex items-center opacity-0 justify-center z-30 pointer-events-none">
        <div className={styles.heroGlow}></div>

        {/* floating preview cards */}
        <div className={styles.floatScene}>
          <div className={`${styles.previewCard} preview-card ${styles.leftTop}`}>
            <img src="/vaultz.png" alt="" />
            <div className={styles.previewContent}>
              <h4>HoliBill</h4>
              <p>E-Commerce Topup</p>
            </div>
          </div>

          <div className={`${styles.previewCard} preview-card ${styles.rightTop}`}>
            <img src="/kitchenmom.png" alt="" />
            <div className={styles.previewContent}>
              <h4>DB Explorer</h4>
              <p>Postgres Tool</p>
            </div>
          </div>

          <div className={`${styles.previewCard} preview-card ${styles.leftBottom}`}>
            <img src="/holibill.png" alt="" />
            <div className={styles.previewContent}>
              <h4>Task Master</h4>
              <p>Management App</p>
            </div>
          </div>

          <div className={`${styles.previewCard} preview-card ${styles.rightBottom}`}>
            <img src="/vaultz.png" alt="" />
            <div className={styles.previewContent}>
              <h4>Motion Portfolio</h4>
              <p>Interactive Design</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center">
          <div className={`${styles.badge} cta-badge`}>
            {" "}
            <span></span>
            Available for projects
          </div>

          <h2 className={`${styles.heroCtaTitle} cta-title`}>
            {" "}
            Let’s build
            <br />
            something great.
          </h2>

          <p className={`${styles.heroDesc} cta-desc`}>I design and build digital experiences that are fast, intuitive, and impactful.</p>

          <div className={styles.ctaButtons}>
            <button className={`${styles.primaryBtn} cta-button`}>View Work →</button>
          </div>
        </div>
      </div>
      {/* CONTACT */}
      <div className="contact absolute inset-0 opacity-0 flex items-center justify-center">
        <div className={styles.contactContainer}>
          <div className={styles.contactTop}>
            <span className={styles.dot}></span>
            <p className={styles.contactLabel}>GET IN TOUCH</p>
          </div>

          <h2 className={styles.contactTitle}>
            Lets work <span>together.</span>
          </h2>

          <p className={styles.contactDesc}>Have an idea, project, or opportunity? I`d love to hear from you.</p>

          <a href="mailto:your@email.com" className={styles.contactMail}>
            ✉ richardricardoyohanes@gmail.com
          </a>

          <div className={styles.contactButtons}>
            <button className={styles.contactBtn}>Say Hello →</button>

            <button className={styles.contactGhost}>Resume ↓</button>
          </div>

          <div className={styles.line}></div>

          <div className={styles.contactSocial}>
            <span>GitHub</span>
            <span>LinkedIn</span>
            <span>Instagram</span>
            <span>Email</span>
          </div>
        </div>
      </div>
    </section>
  );
}
