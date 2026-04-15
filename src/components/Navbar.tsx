import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const getHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <nav className={styles.nav}>
      <Link className={styles.navLogo} to="/">
        Smrutishree Naik
      </Link>
      <div className={styles.navLinks}>
        <a href={getHref("#about")}>About</a>
        <a href={getHref("#skills")}>Skills</a>
        <a href={getHref("#experience")}>Experience</a>
        <a href={getHref("#projects")}>Projects</a>
        <Link to="/case-studies">Case Studies</Link>
        <a href={getHref("#contact")}>Contact</a>
      </div>
      <a className={styles.navCta} href={getHref("#contact")}>
        Let's Connect →
      </a>
    </nav>
  );
};

export default Navbar;
