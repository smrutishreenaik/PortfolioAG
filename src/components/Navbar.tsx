import React from "react";
import { Navbar as BootstrapNavbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  return (
    <BootstrapNavbar
      expand="lg"
      fixed="top"
      variant="dark"
      className={styles.navbarContainer}
    >
      <Container className={styles.navContainer}>
        <BootstrapNavbar.Brand as={Link} to="/" className={styles.brand}>
          SN.
        </BootstrapNavbar.Brand>
        <div className="ms-auto">
          <a href="#contact" className={styles.hireMeBtn}>
            HIRE ME &rarr;
          </a>
        </div>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
