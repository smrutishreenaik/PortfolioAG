import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import styles from "./AdminDashboard.module.scss";
import {
  FaProjectDiagram,
  FaBookOpen,
  FaBriefcase,
  FaGraduationCap,
  FaQuoteLeft,
} from "react-icons/fa";

const AdminDashboard: React.FC = () => {
  // Placeholder stats - usually fetched from Firestore collections count
  const stats = [
    {
      title: "Total Projects",
      count: 3,
      icon: <FaProjectDiagram />,
      color: "#0d6efd",
    },
    { title: "Case Studies", count: 3, icon: <FaBookOpen />, color: "#6610f2" },
    {
      title: "Experience Items",
      count: 2,
      icon: <FaBriefcase />,
      color: "#d63384",
    },
    { title: "Skills", count: 12, icon: <FaGraduationCap />, color: "#198754" },
    {
      title: "Testimonials",
      count: 4,
      icon: <FaQuoteLeft />,
      color: "#fd7e14",
    },
  ];

  return (
    <div>
      <h3 className="mb-4 text-white">Dashboard Overview</h3>
      <Row className="g-4">
        {stats.map((stat, idx) => (
          <Col md={6} lg={4} key={idx}>
            <Card className={styles.statCard}>
              <Card.Body className="d-flex align-items-center">
                <div
                  className={styles.iconWrapper}
                  style={{
                    backgroundColor: `${stat.color}20`,
                    color: stat.color,
                  }}
                >
                  {stat.icon}
                </div>
                <div className="ms-3">
                  <h5 className="mb-0 fw-bold text-white">{stat.count}</h5>
                  <small className="text-white-50">{stat.title}</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5 g-4">
        <Col lg={12}>
          <Card className={styles.welcomeCard}>
            <Card.Body>
              <h4 className="text-white mb-3">Welcome to your Portfolio CMS</h4>
              <p className="text-white-50 mb-0">
                Use the sidebar to navigate through different sections of your
                website. Changes made here will directly reflect on the public
                portfolio. Ensure you upload highly optimized images for better
                performance.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
