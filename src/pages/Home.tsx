import React, { useEffect } from "react";
import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import PainPoints from "../components/sections/PainPoints";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import CaseStudiesPreview from "../components/sections/CaseStudiesPreview";
import CaseStudiesOverview from "../components/sections/CaseStudiesOverview";
import Contact from "../components/sections/Contact";
import Footer from "../components/Footer";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  useEffect(() => {
    // Basic initialization if necessary
  }, []);

  return (
    <div className={styles.homeContainer}>
      <Hero />
      <Stats />
      <PainPoints />
      <About />
      <Skills />
      <Projects />
      <CaseStudiesPreview />
      <Experience />
      <CaseStudiesOverview />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
