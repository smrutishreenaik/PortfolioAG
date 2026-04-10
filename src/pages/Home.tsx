import React, { useEffect } from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import CaseStudiesOverview from "../components/sections/CaseStudiesOverview";
import Experience from "../components/sections/Experience";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import styles from "./Home.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  useEffect(() => {
    // Basic GSAP reveal animations for sections
    const sections = document.querySelectorAll(`.${styles.scrollSection}`);

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        gsap.fromTo(
          section.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top center",
              end: "bottom center",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.scrollSection}>
        <Hero />
      </div>
      <div className={styles.scrollSection}>
        <About />
      </div>
      <div className={styles.scrollSection}>
        <Projects />
      </div>
      <div className={styles.scrollSection}>
        <Skills />
      </div>
      <div className={styles.scrollSection}>
        <CaseStudiesOverview />
      </div>
      <div className={styles.scrollSection}>
        <Experience />
      </div>
      <div className={styles.scrollSection}>
        <Testimonials />
      </div>
      <div className={styles.scrollSection}>
        <Contact />
      </div>
    </div>
  );
};

export default Home;
