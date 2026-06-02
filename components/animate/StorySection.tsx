"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./story.module.css";
import { SiNextdotjs, SiReact, SiTypescript, SiPostgresql, SiPrisma } from "react-icons/si";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TbBrandFramerMotion } from "react-icons/tb";
import { TransitionLink } from "@/components/animate/TransitionLink";
import Link from "next/link";

export default function Story() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hideScroll, setHideScroll] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;

      const pageHeight = document.documentElement.scrollHeight;

      // 150px sebelum mentok bawah
      setHideScroll(scrollPosition >= pageHeight - 150);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=4000", // Increased scroll space to avoid ending too quickly
          scrub: 1, // smoother
          pin: true,
        },
      });

      triggerRef.current = tl.scrollTrigger!;

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
        .addLabel("cta-section")
        // 👉 CONTACT
        .to(".cta", { opacity: 0, duration: 1 })
        .fromTo(".contact", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1, pointerEvents: "all" });
    }, ref);

    // const goContact = () => {
    //   if (!ref.current) return;

    //   gsap.to(window, {
    //     duration: 2,
    //     ease: "power2.inOut",

    //     scrollTo: {
    //       y: ref.current.offsetTop + 2800,
    //     },
    //   });
    // };

    return () => ctx.revert();
  }, []);

  const goExplore = () => {
    if (!triggerRef.current) return;

    gsap.to(window, {
      duration: 1.5,
      ease: "power2.inOut",
      scrollTo: {
        y: triggerRef.current.labelToScroll("cta-section"),
      },
    });
  };

  const goContact = () => {
    if (!triggerRef.current) return;

    gsap.to(window, {
      duration: 2,
      ease: "power2.inOut",

      scrollTo: {
        y: triggerRef.current.end,
      },
    });
  };

  return (
    <section ref={ref} className="min-h-screen w-full text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-40">
      {/* HERO */}
      <div className="hero-text max-w-xl z-10 flex flex-col items-center md:items-start text-center md:text-left mt-20 md:mt-0">
        <div className={styles.heroBadge}>
          <span></span>
          Available for projects
        </div>

        <h1 className={styles.heroTitle}>
          Hello There!
          <br />
          I’m Richard
        </h1>

        <p className={styles.heroDescTop}>I build modern, fast and responsive digital experiences.</p>

        <div className={styles.heroButtons}>
          <Button onClick={goExplore}>Explore Work →</Button>

          <Button className={styles.ghostBtn} onClick={goContact}>
            Contact
          </Button>
        </div>
      </div>

      <div className="hero-img relative mt-10 md:mt-0">
        <div className={styles.photoGlow}></div>

        <img src="/saya2.png" className={styles.heroImg} />

        <div className={styles.floatingTag}>Full Stack Developer</div>
      </div>

      <div
        className={`${styles.scrollHint}
  ${hideScroll ? styles.hideScroll : ""}`}>
        Scroll ↓
      </div>

      {/* ABOUT */}
      <div className="about absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-40 opacity-0 pointer-events-none">
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
            <img src="/rich-crypto.png" alt="" />
            <div className={styles.previewContent}>
              <h4>SaaS</h4>
              <p>Software as a Service</p>
            </div>
          </div>

          <div className={`${styles.previewCard} preview-card ${styles.rightTop}`}>
            <img src="/landingpage.png" alt="" />
            <div className={styles.previewContent}>
              <h4>Landing Page</h4>
              <p>A website built to showcase a specific product.</p>
            </div>
          </div>

          <div className={`${styles.previewCard} preview-card ${styles.leftBottom}`}>
            <img src="/coin-admin.png" alt="" />
            <div className={styles.previewContent}>
              <h4>Admin Web</h4>
              <p>Management and Control Web App</p>
            </div>
          </div>

          <div className={`${styles.previewCard} preview-card ${styles.rightBottom}`}>
            <img src="/coin.png" alt="" />
            <div className={styles.previewContent}>
              <h4>Marketplace Web</h4>
              <p>Marketplace</p>
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
            <TransitionLink href="/projects">
              <button className={`${styles.primaryBtn} cta-button`}>View Work →</button>
            </TransitionLink>
          </div>
        </div>
      </div>
      {/* CONTACT */}
      <div className="contact absolute inset-0 opacity-0 flex items-center justify-center z-40 pointer-events-none" id="contact">
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
            <TransitionLink href="/contact">
              <button className={styles.contactBtn}>Say Hello →</button>
            </TransitionLink>

            <a href="/Richard Ricardo-CV.pdf" download="Richard_Ricardo_CV.pdf" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className={styles.contactGhost}>Resume ↓</button>
            </a>
          </div>

          <div className={styles.line}></div>

          <div className={styles.contactSocial}>
            <Link href="https://github.com/richardricardo-dev" target="_blank" rel="noopener noreferrer">
              <span>GitHub</span>
            </Link>

            <Link href="https://www.linkedin.com/in/richard-ricardo-39368731b/" target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span>
            </Link>

            {/* <Link href="https://www.instagram.com/your_instagram_handle" target="_blank" rel="noopener noreferrer">
              <span>Instagram</span>
            </Link> */}

            <Link href="mailto:richardricardoyohanes@gmail.com">
              <span>Email</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
