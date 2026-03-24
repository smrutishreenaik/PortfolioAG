import React from "react";
import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
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
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className={styles.brand}>
          AG
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={styles.navLink}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/case-studies" className={styles.navLink}>
              Case Studies
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
