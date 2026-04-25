import React from "react";
import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import PainPoints from "../components/sections/PainPoints";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import CaseStudiesPreview from "../components/sections/CaseStudiesPreview";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";
import Footer from "../components/Footer";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
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
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
