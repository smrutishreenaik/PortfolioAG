import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <span>&copy; 2026 Smrutishree Naik</span>
      <span>Bengaluru, India</span>
      <span>Senior Software Engineer · Problem Solving · System Design</span>
    </footer>
  );
};

export default Footer;
