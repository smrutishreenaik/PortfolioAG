import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <span>© 2025 Smrutishree Naik</span>
      <span>Bengaluru, India</span>
      <span>Senior Software Engineer · C# · .NET · React</span>
    </footer>
  );
};

export default Footer;
