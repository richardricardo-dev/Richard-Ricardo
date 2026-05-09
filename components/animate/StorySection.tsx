"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./story.module.css";
import { SiNextdotjs, SiReact, SiTypescript, SiPostgresql, SiPrisma } from "react-icons/si";

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
        .fromTo(".skills", { opacity: 0 }, { opacity: 1, duration: 1 })

        // 👉 CTA
        .to(".skills", { opacity: 0, duration: 1 })
        .fromTo(".cta", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })

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
        <Button>Hello</Button>{" "}
      </div>

      <div className="hero-img relative flex items-center justify-center">
        <img src="/saya2.png" className={styles.heroImg} />
      </div>

      {/* ABOUT */}
      <div className="about absolute inset-0 flex items-center justify-between px-40 opacity-0">
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
      <div className="skills absolute inset-0 z-20">
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

      {/* CTA */}
      <div className="cta absolute inset-0 flex items-center justify-center opacity-0 text-center">
        <div>
          <h2 className="text-4xl font-bold">Let’s build something great</h2>
          <button className="mt-4 px-6 py-2 bg-white text-black rounded-full">View Work</button>
        </div>
      </div>

      {/* CONTACT */}
      <div className="contact absolute inset-0 flex items-center justify-center opacity-0 text-center">
        <div>
          <h2 className="text-4xl font-bold">Contact Me</h2>
          <p className="mt-2 opacity-60">your@email.com</p>
        </div>
      </div>
    </section>
  );
}
