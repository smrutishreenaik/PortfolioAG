import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import styles from "./Projects.module.scss";

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate track horizontal translation
  // It moves from 0 to -100% + viewport width
  // But to be simpler and match reference:
  // Move x from 0 to maybe -75% based on scroll progress

  // We use trackXProgress to drive the container
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 4 cards => 0 to 0.25 is dot 0, etc.
    let dot = Math.floor(latest * 4);
    if (dot > 3) dot = 3;
    if (dot < 0) dot = 0;
    setActiveDot(dot);
  });

  return (
    <section id="projects" className={styles.projectsSection} ref={sectionRef}>
      <div className={styles.stickyOuter}>
        <div className={styles.headerWrap}>
          <div className={styles.sectionEyebrow}>Projects</div>
          <div className={styles.sectionTitle}>Real work I've built</div>
          <div className={styles.scrollHint}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10h12M12 6l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Scroll to explore projects
          </div>
          <div className={styles.progressDots}>
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`${styles.projDot} ${
                  activeDot === index ? styles.active : ""
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className={styles.trackWindow}>
          <motion.div className={styles.trackWrap} style={{ x: trackX }}>
            {/* Card 1 */}
            <div className={styles.projCard}>
              <div className={styles.projImg}>
                <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
                  {/* BG */}
                  <rect width="200" height="150" fill="#f0fdf4" />
                  {/* Robot head */}
                  <rect
                    x="70"
                    y="20"
                    width="60"
                    height="50"
                    rx="12"
                    fill="#1e1e2e"
                    stroke="#3d9e6a"
                    strokeWidth="2.5"
                  />
                  <rect
                    x="80"
                    y="30"
                    width="40"
                    height="24"
                    rx="5"
                    fill="#0f172a"
                  />
                  {/* Robot eyes (glowing) */}
                  <circle cx="91" cy="42" r="6" fill="#3d9e6a" opacity="0.3" />
                  <circle cx="91" cy="42" r="4" fill="#3d9e6a" />
                  <circle cx="109" cy="42" r="6" fill="#3d9e6a" opacity="0.3" />
                  <circle cx="109" cy="42" r="4" fill="#3d9e6a" />
                  <circle cx="90" cy="41" r="1.5" fill="white" />
                  <circle cx="108" cy="41" r="1.5" fill="white" />
                  {/* Robot mouth */}
                  <rect
                    x="84"
                    y="56"
                    width="32"
                    height="6"
                    rx="3"
                    fill="#3d9e6a"
                    opacity="0.6"
                  />
                  <rect
                    x="88"
                    y="57.5"
                    width="4"
                    height="3"
                    rx="1"
                    fill="#bbf7d0"
                  />
                  <rect
                    x="94"
                    y="57.5"
                    width="4"
                    height="3"
                    rx="1"
                    fill="#bbf7d0"
                  />
                  <rect
                    x="100"
                    y="57.5"
                    width="4"
                    height="3"
                    rx="1"
                    fill="#bbf7d0"
                  />
                  <rect
                    x="106"
                    y="57.5"
                    width="4"
                    height="3"
                    rx="1"
                    fill="#bbf7d0"
                  />
                  {/* Antenna */}
                  <line
                    x1="100"
                    y1="20"
                    x2="100"
                    y2="12"
                    stroke="#3d9e6a"
                    strokeWidth="2"
                  />
                  <circle cx="100" cy="9" r="4" fill="#3d9e6a" />
                  {/* Robot body/stand */}
                  <rect
                    x="85"
                    y="70"
                    width="30"
                    height="18"
                    rx="5"
                    fill="#334155"
                    stroke="#3d9e6a"
                    strokeWidth="1.5"
                  />
                  {/* Connector lines to staff icons */}
                  <line
                    x1="72"
                    y1="84"
                    x2="40"
                    y2="108"
                    stroke="#3d9e6a"
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                  />
                  <line
                    x1="100"
                    y1="88"
                    x2="100"
                    y2="108"
                    stroke="#3d9e6a"
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                  />
                  <line
                    x1="128"
                    y1="84"
                    x2="160"
                    y2="108"
                    stroke="#3d9e6a"
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                  />
                  {/* Staff person cards */}
                  <rect
                    x="16"
                    y="108"
                    width="48"
                    height="32"
                    rx="8"
                    fill="white"
                    stroke="#3d9e6a"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="40"
                    cy="118"
                    r="6"
                    fill="#fde8d0"
                    stroke="#222"
                    strokeWidth="1"
                  />
                  <rect
                    x="24"
                    y="126"
                    width="32"
                    height="3"
                    rx="1.5"
                    fill="#e2e8f0"
                  />
                  <rect
                    x="28"
                    y="131"
                    width="24"
                    height="3"
                    rx="1.5"
                    fill="#3d9e6a"
                    opacity="0.4"
                  />
                  <rect
                    x="76"
                    y="108"
                    width="48"
                    height="32"
                    rx="8"
                    fill="white"
                    stroke="#3d9e6a"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="100"
                    cy="118"
                    r="6"
                    fill="#fde8d0"
                    stroke="#222"
                    strokeWidth="1"
                  />
                  <rect
                    x="84"
                    y="126"
                    width="32"
                    height="3"
                    rx="1.5"
                    fill="#e2e8f0"
                  />
                  <rect
                    x="88"
                    y="131"
                    width="24"
                    height="3"
                    rx="1.5"
                    fill="#3d9e6a"
                    opacity="0.6"
                  />
                  <rect
                    x="136"
                    y="108"
                    width="48"
                    height="32"
                    rx="8"
                    fill="white"
                    stroke="#3d9e6a"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="160"
                    cy="118"
                    r="6"
                    fill="#fde8d0"
                    stroke="#222"
                    strokeWidth="1"
                  />
                  <rect
                    x="144"
                    y="126"
                    width="32"
                    height="3"
                    rx="1.5"
                    fill="#e2e8f0"
                  />
                  <rect
                    x="148"
                    y="131"
                    width="24"
                    height="3"
                    rx="1.5"
                    fill="#3d9e6a"
                    opacity="0.4"
                  />
                  {/* 80% badge */}
                  <rect
                    x="138"
                    y="8"
                    width="52"
                    height="28"
                    rx="8"
                    fill="#3d9e6a"
                  />
                  <text
                    x="164"
                    y="20"
                    fontSize="9"
                    fill="white"
                    textAnchor="middle"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    ↓80%
                  </text>
                  <text
                    x="164"
                    y="31"
                    fontSize="7"
                    fill="#bbf7d0"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    time saved
                  </text>
                  {/* sparkle */}
                  <path
                    d="M24 28 l2 4 l4 2 l-4 2 l-2 4 l-2-4 l-4-2 l4-2z"
                    fill="#fbbf24"
                    opacity="0.7"
                  />
                </svg>
              </div>
              <div className={styles.projBody}>
                <div className={styles.projType}>AI · GPT · C#</div>
                <div className={styles.projTitle}>
                  AI Project Staffing Recommender
                </div>
                <div className={styles.projLabel}>What changed</div>
                <div className={styles.projText}>
                  RFP documents requiring senior manual analysis were fed into a
                  GPT pipeline that extracts role requirements and matches them
                  to an internal skills database.
                </div>
                <div className={`${styles.projLabel} ${styles.green}`}>
                  Outcome
                </div>
                <div className={styles.projText}>
                  ~80% reduction in staffing decision time. Junior PMs now make
                  confident decisions independently.
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className={styles.projCard}>
              <div className={styles.projImg}>
                <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
                  <rect width="200" height="150" fill="#f0f9f4" />
                  {/* Big shield */}
                  <path
                    d="M100 12 L162 38 L162 92 Q162 134 100 150 Q38 134 38 92 L38 38 Z"
                    fill="#dcfce7"
                    stroke="#3d9e6a"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M100 26 L148 48 L148 92 Q148 122 100 136 Q52 122 52 92 L52 48 Z"
                    fill="white"
                    stroke="#3d9e6a"
                    strokeWidth="1.5"
                  />
                  {/* Big checkmark */}
                  <path
                    d="M72 90 L90 108 L128 72"
                    stroke="#3d9e6a"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Lock on shield */}
                  <rect
                    x="82"
                    y="50"
                    width="36"
                    height="28"
                    rx="6"
                    fill="#3d9e6a"
                    opacity="0.12"
                    stroke="#3d9e6a"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M88 50 Q88 38 100 38 Q112 38 112 50"
                    stroke="#3d9e6a"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle cx="100" cy="63" r="5" fill="#3d9e6a" />
                  <rect
                    x="98"
                    y="63"
                    width="4"
                    height="7"
                    rx="2"
                    fill="#3d9e6a"
                  />
                  {/* 99% badge */}
                  <circle cx="164" cy="22" r="18" fill="#3d9e6a" />
                  <text
                    x="164"
                    y="18"
                    fontSize="10"
                    fill="white"
                    textAnchor="middle"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    99%
                  </text>
                  <text
                    x="164"
                    y="30"
                    fontSize="7"
                    fill="#bbf7d0"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    secure
                  </text>
                  {/* Bug zapped away */}
                  <text x="22" y="48" fontSize="18" opacity="0.4">
                    🐛
                  </text>
                  <path
                    d="M36 38 L46 28"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M46 38 L36 28"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Sparkles */}
                  <path
                    d="M172 68 l2 4 l4 2 l-4 2 l-2 4 l-2-4 l-4-2 l4-2z"
                    fill="#fbbf24"
                    opacity="0.7"
                  />
                  <path
                    d="M24 110 l1.5 3 l3 1.5 l-3 1.5 l-1.5 3 l-1.5-3 l-3-1.5 l3-1.5z"
                    fill="#3d9e6a"
                    opacity="0.5"
                  />
                </svg>
              </div>
              <div className={styles.projBody}>
                <div className={styles.projType}>
                  Security · Blazor · .NET Core
                </div>
                <div className={styles.projTitle}>
                  Infrastructure Management Platform
                </div>
                <div className={styles.projLabel}>What changed</div>
                <div className={styles.projText}>
                  Authentication rebuilt with JWT tokens and Active Directory
                  integration, with hardened role-based access across the entire
                  Blazor web application.
                </div>
                <div className={`${styles.projLabel} ${styles.green}`}>
                  Outcome
                </div>
                <div className={styles.projText}>
                  Security vulnerabilities reduced by 99%. Manual provisioning
                  effort down by 70%.
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className={styles.projCard}>
              <div className={styles.projImg}>
                <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
                  <rect width="200" height="150" fill="#fff7ed" />
                  {/* OLD DB (rusty/messy) */}
                  <ellipse
                    cx="50"
                    cy="38"
                    rx="28"
                    ry="10"
                    fill="#fde8d0"
                    stroke="#e88a3d"
                    strokeWidth="2"
                  />
                  <rect
                    x="22"
                    y="38"
                    width="56"
                    height="48"
                    fill="#fde8d0"
                    stroke="#e88a3d"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="50"
                    cy="86"
                    rx="28"
                    ry="10"
                    fill="#fde8d0"
                    stroke="#e88a3d"
                    strokeWidth="2"
                  />
                  {/* cracks/bugs on old DB */}
                  <path
                    d="M30 55 L38 62 L34 68"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M58 45 L64 52"
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <text
                    x="50"
                    y="67"
                    fontSize="9"
                    fill="#e88a3d"
                    textAnchor="middle"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    OLD
                  </text>
                  {/* Bug icons on old DB */}
                  <text x="34" y="82" fontSize="10" opacity="0.5">
                    🐛
                  </text>
                  <text x="56" y="82" fontSize="10" opacity="0.5">
                    🐛
                  </text>
                  {/* Arrow with transformation gear */}
                  <line
                    x1="80"
                    y1="70"
                    x2="118"
                    y2="70"
                    stroke="#555"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M114 65 L120 70 L114 75"
                    stroke="#555"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Gear in middle */}
                  <circle
                    cx="100"
                    cy="55"
                    r="12"
                    fill="white"
                    stroke="#6b9bff"
                    strokeWidth="1.8"
                  />
                  <circle cx="100" cy="55" r="5" fill="#6b9bff" opacity="0.3" />
                  <path
                    d="M100 43 L100 40 M100 67 L100 70 M88 55 L85 55 M112 55 L115 55 M91.5 46.5 L89.3 44.3 M108.5 63.5 L110.7 65.7 M91.5 63.5 L89.3 65.7 M108.5 46.5 L110.7 44.3"
                    stroke="#6b9bff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  {/* NEW DB (clean/shiny) */}
                  <ellipse
                    cx="158"
                    cy="38"
                    rx="28"
                    ry="10"
                    fill="#dcfce7"
                    stroke="#3d9e6a"
                    strokeWidth="2"
                  />
                  <rect
                    x="130"
                    y="38"
                    width="56"
                    height="48"
                    fill="#dcfce7"
                    stroke="#3d9e6a"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="158"
                    cy="86"
                    rx="28"
                    ry="10"
                    fill="#dcfce7"
                    stroke="#3d9e6a"
                    strokeWidth="2"
                  />
                  {/* Checkmark on new DB */}
                  <path
                    d="M143 62 L152 72 L173 50"
                    stroke="#3d9e6a"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <text
                    x="158"
                    y="90"
                    fontSize="9"
                    fill="#3d9e6a"
                    textAnchor="middle"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    NEW
                  </text>
                  {/* 600 bugs fixed badge */}
                  <rect
                    x="8"
                    y="100"
                    width="80"
                    height="22"
                    rx="6"
                    fill="#1e1e2e"
                  />
                  <text
                    x="48"
                    y="115"
                    fontSize="8.5"
                    fill="#4ade80"
                    textAnchor="middle"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    600+ bugs fixed ✓
                  </text>
                </svg>
              </div>
              <div className={styles.projBody}>
                <div className={styles.projType}>WPF · SQL · ETL</div>
                <div className={styles.projTitle}>
                  Database Conversion Engine
                </div>
                <div className={styles.projLabel}>What changed</div>
                <div className={styles.projText}>
                  Complex schema conversions previously done by hand were
                  automated with WPF tooling, ETL pipelines, and data validation
                  workflows.
                </div>
                <div className={`${styles.projLabel} ${styles.green}`}>
                  Outcome
                </div>
                <div className={styles.projText}>
                  600+ legacy code issues resolved. Repeatable, error-free
                  migrations with no manual intervention.
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className={styles.projCard}>
              <div className={styles.projImg}>
                <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
                  <rect width="200" height="150" fill="#f0f4ff" />
                  {/* Browser window */}
                  <rect
                    x="14"
                    y="12"
                    width="172"
                    height="120"
                    rx="10"
                    fill="white"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                  />
                  {/* Browser bar */}
                  <rect
                    x="14"
                    y="12"
                    width="172"
                    height="28"
                    rx="10"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="1.5"
                  />
                  <rect x="14" y="30" width="172" height="10" fill="#f8fafc" />
                  {/* Traffic lights */}
                  <circle cx="30" cy="26" r="5.5" fill="#ff6b6b" />
                  <circle cx="45" cy="26" r="5.5" fill="#ffd93d" />
                  <circle cx="60" cy="26" r="5.5" fill="#3d9e6a" />
                  {/* URL bar */}
                  <rect
                    x="72"
                    y="19"
                    width="100"
                    height="14"
                    rx="6"
                    fill="white"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                  <text
                    x="122"
                    y="29"
                    fontSize="7.5"
                    fill="#94a3b8"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    app.platform.io
                  </text>
                  {/* Dashboard content */}
                  {/* Sidebar */}
                  <rect x="14" y="40" width="42" height="92" fill="#1e293b" />
                  {/* Sidebar items */}
                  <rect
                    x="20"
                    y="50"
                    width="30"
                    height="7"
                    rx="3.5"
                    fill="#3d9e6a"
                  />
                  <rect
                    x="20"
                    y="62"
                    width="30"
                    height="7"
                    rx="3.5"
                    fill="#334155"
                  />
                  <rect
                    x="20"
                    y="74"
                    width="30"
                    height="7"
                    rx="3.5"
                    fill="#334155"
                  />
                  <rect
                    x="20"
                    y="86"
                    width="30"
                    height="7"
                    rx="3.5"
                    fill="#334155"
                  />
                  <rect
                    x="20"
                    y="98"
                    width="30"
                    height="7"
                    rx="3.5"
                    fill="#334155"
                  />
                  {/* Sidebar avatar */}
                  <circle cx="35" cy="120" r="9" fill="#3d9e6a" opacity="0.3" />
                  <circle
                    cx="35"
                    cy="117"
                    r="4"
                    fill="#fde8d0"
                    stroke="#222"
                    strokeWidth="1"
                  />
                  <ellipse
                    cx="35"
                    cy="125"
                    rx="6"
                    ry="4"
                    fill="#fde8d0"
                    stroke="#222"
                    strokeWidth="0.8"
                  />
                  {/* Main area: stat cards */}
                  <rect
                    x="62"
                    y="45"
                    width="48"
                    height="30"
                    rx="6"
                    fill="#f0fdf4"
                    stroke="#3d9e6a"
                    strokeWidth="1.2"
                  />
                  <text
                    x="86"
                    y="57"
                    fontSize="13"
                    fill="#3d9e6a"
                    textAnchor="middle"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    20+
                  </text>
                  <text
                    x="86"
                    y="68"
                    fontSize="6.5"
                    fill="#6b9bff"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    features
                  </text>

                  <rect
                    x="116"
                    y="45"
                    width="64"
                    height="30"
                    rx="6"
                    fill="#eef2ff"
                    stroke="#6b9bff"
                    strokeWidth="1.2"
                  />
                  <text
                    x="148"
                    y="57"
                    fontSize="13"
                    fill="#6b9bff"
                    textAnchor="middle"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    ↑10%
                  </text>
                  <text
                    x="148"
                    y="68"
                    fontSize="6.5"
                    fill="#6b9bff"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                  >
                    faster releases
                  </text>

                  {/* Mini bar chart */}
                  <rect
                    x="62"
                    y="82"
                    width="118"
                    height="44"
                    rx="6"
                    fill="#f8fafc"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                  <rect
                    x="74"
                    y="105"
                    width="10"
                    height="14"
                    rx="2"
                    fill="#6b9bff"
                    opacity="0.5"
                  />
                  <rect
                    x="89"
                    y="96"
                    width="10"
                    height="23"
                    rx="2"
                    fill="#6b9bff"
                    opacity="0.6"
                  />
                  <rect
                    x="104"
                    y="89"
                    width="10"
                    height="30"
                    rx="2"
                    fill="#3d9e6a"
                    opacity="0.7"
                  />
                  <rect
                    x="119"
                    y="84"
                    width="10"
                    height="35"
                    rx="2"
                    fill="#3d9e6a"
                  />
                  <rect
                    x="134"
                    y="92"
                    width="10"
                    height="27"
                    rx="2"
                    fill="#3d9e6a"
                    opacity="0.8"
                  />
                  <rect
                    x="149"
                    y="87"
                    width="10"
                    height="32"
                    rx="2"
                    fill="#3d9e6a"
                  />
                  <line
                    x1="68"
                    y1="120"
                    x2="172"
                    y2="120"
                    stroke="#e2e8f0"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              <div className={styles.projBody}>
                <div className={styles.projType}>
                  .NET Core · React · Self-Service
                </div>
                <div className={styles.projTitle}>
                  Self-Service Web Platform
                </div>
                <div className={styles.projLabel}>What changed</div>
                <div className={styles.projText}>
                  Full-featured self-service platform with 20+ UI features and
                  RESTful APIs built with .NET Core and React.js at Mindfire
                  Solutions.
                </div>
                <div className={`${styles.projLabel} ${styles.green}`}>
                  Outcome
                </div>
                <div className={styles.projText}>
                  10% faster releases, 10% more test coverage, 15% fewer
                  post-deployment bugs.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
