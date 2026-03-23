import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./AdminLayout.module.scss";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaBriefcase,
  FaGraduationCap,
  FaQuoteLeft,
  FaSignOutAlt,
  FaBookOpen,
} from "react-icons/fa";

const AdminLayout: React.FC = () => {
  const { logout, currentUser } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: <FaTachometerAlt /> },
    { name: "Projects", path: "/admin/projects", icon: <FaProjectDiagram /> },
    { name: "Case Studies", path: "/admin/case-studies", icon: <FaBookOpen /> },
    { name: "Experience", path: "/admin/experience", icon: <FaBriefcase /> },
    { name: "Skills", path: "/admin/skills", icon: <FaGraduationCap /> },
    {
      name: "Testimonials",
      path: "/admin/testimonials",
      icon: <FaQuoteLeft />,
    },
  ];

  return (
    <div className={styles.adminWrapper}>
      <Container fluid className="p-0">
        <Row className="g-0 min-vh-100">
          {/* Sidebar */}
          <Col md={3} lg={2} className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h3 className="text-white fs-5 fw-bold mb-0">AG Admin</h3>
              <small className="text-white-50">{currentUser?.email}</small>
            </div>

            <Nav className="flex-column mt-4">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.name}
                  as={Link}
                  to={item.path}
                  className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ""}`}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {item.name}
                </Nav.Link>
              ))}
            </Nav>

            <div className={styles.sidebarFooter}>
              <Nav.Link as={Link} to="/" className={styles.navLink}>
                &larr; Back to Site
              </Nav.Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </div>
          </Col>

          {/* Main Content Area */}
          <Col md={9} lg={10} className={styles.mainContent}>
            <div className={styles.contentHeader}>
              <h2 className="fs-4 mb-0 fw-bold">Management Console</h2>
            </div>
            <div className={styles.contentBody}>
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminLayout;
