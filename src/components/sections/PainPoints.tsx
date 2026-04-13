import React from "react";
import styles from "./PainPoints.module.scss";

const PainPoints: React.FC = () => {
  return (
    <section id="pain" className={styles.painSection}>
      <div className={styles.sectionWrap}>
        <div className={styles.sectionEyebrow}>Why good engineering matters</div>
        <div className={styles.sectionTitle}>Problems I love solving</div>
        <div className={styles.painGrid}>
          {/* Card 1: Overwhelmed dev */}
          <div className={styles.painCard}>
            <svg className={styles.painDoodle} viewBox="0 0 110 110" fill="none">
              {/* BG bubble */}
              <circle cx="55" cy="55" r="48" fill="#fef3f2" opacity="0.6" />
              {/* Desk */}
              <rect x="18" y="82" width="74" height="8" rx="4" fill="#e8e4de" />
              {/* Laptop */}
              <rect x="26" y="60" width="58" height="36" rx="5" fill="#1e1e2e" stroke="#333" strokeWidth="1.5" />
              <rect x="30" y="64" width="50" height="28" rx="3" fill="#0f172a" />
              {/* Screen lines (red = errors) */}
              <rect x="34" y="68" width="22" height="3.5" rx="1.5" fill="#ef4444" opacity="0.8" />
              <rect x="34" y="75" width="36" height="3.5" rx="1.5" fill="#f97316" opacity="0.6" />
              <rect x="34" y="82" width="28" height="3.5" rx="1.5" fill="#ef4444" opacity="0.5" />
              {/* ERROR badge on screen */}
              <rect x="56" y="65" width="20" height="10" rx="3" fill="#ef4444" />
              <text x="66" y="73" fontSize="5.5" fill="white" textAnchor="middle" fontFamily="monospace" fontWeight="700">ERR!</text>

              {/* Character head */}
              <circle cx="55" cy="35" r="16" fill="#fde8d0" stroke="#222" strokeWidth="1.8" />
              {/* Hair messy */}
              <path d="M40 30 Q42 18 55 17 Q68 18 70 30" fill="#2d1b00" />
              <path d="M40 27 Q37 22 40 18" stroke="#2d1b00" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M70 27 Q73 22 71 19" stroke="#2d1b00" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M50 17 Q48 11 52 9" stroke="#2d1b00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M60 17 Q62 11 60 9" stroke="#2d1b00" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {/* Stressed eyes X_X style */}
              <path d="M48 34 L52 38 M52 34 L48 38" stroke="#222" strokeWidth="2" strokeLinecap="round" />
              <path d="M58 34 L62 38 M62 34 L58 38" stroke="#222" strokeWidth="2" strokeLinecap="round" />
              {/* Sweat drop */}
              <path d="M68 28 Q70 31 68 34 Q66 31 68 28Z" fill="#60a5fa" opacity="0.7" />
              {/* Wobbly mouth */}
              <path d="M48 44 Q52 41 55 44 Q58 47 62 44" stroke="#222" strokeWidth="1.5" fill="none" strokeLinecap="round" />

              {/* Floating warning signs */}
              <path d="M14 20 L20 10 L26 20 Z" fill="#fde047" stroke="#d97706" strokeWidth="1.2" />
              <text x="20" y="19" fontSize="6" fill="#92400e" textAnchor="middle" fontWeight="700">!</text>
              <path d="M80 14 L86 4 L92 14 Z" fill="#fde047" stroke="#d97706" strokeWidth="1.2" />
              <text x="86" y="13" fontSize="6" fill="#92400e" textAnchor="middle" fontWeight="700">!</text>
              {/* Notification bubble */}
              <circle cx="89" cy="46" r="9" fill="#ef4444" />
              <text x="89" y="50" fontSize="7" fill="white" textAnchor="middle" fontWeight="700">99</text>
            </svg>
            <div className={styles.painText}>High-value engineers doing low-value, repetitive work</div>
          </div>
          
          {/* Card 2: Tool overload */}
          <div className={styles.painCard} style={{ transitionDelay: ".08s" }}>
            <svg className={styles.painDoodle} viewBox="0 0 110 110" fill="none">
              <circle cx="55" cy="55" r="48" fill="#f0fdf4" opacity="0.6" />
              {/* Robot / AI box left out */}
              <rect x="6" y="38" width="28" height="32" rx="6" fill="#dcfce7" stroke="#3d9e6a" strokeWidth="1.8" />
              {/* Robot face */}
              <rect x="11" y="43" width="18" height="14" rx="3" fill="#bbf7d0" stroke="#3d9e6a" strokeWidth="1" />
              <circle cx="16" cy="49" r="2.5" fill="#3d9e6a" />
              <circle cx="24" cy="49" r="2.5" fill="#3d9e6a" />
              <rect x="14" y="53" width="10" height="2.5" rx="1" fill="#3d9e6a" opacity="0.6" />
              {/* AI antenna */}
              <line x1="20" y1="38" x2="20" y2="32" stroke="#3d9e6a" strokeWidth="1.5" />
              <circle cx="20" cy="30" r="2.5" fill="#3d9e6a" />
              {/* AI label */}
              <text x="20" y="75" fontSize="7" fill="#3d9e6a" textAnchor="middle" fontWeight="700" fontFamily="monospace">AI</text>
              {/* Big X cross blocking connection */}
              <path d="M36 52 L48 62 M48 52 L36 62" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />

              {/* Character in middle */}
              <circle cx="64" cy="37" r="14" fill="#fde8d0" stroke="#222" strokeWidth="1.8" />
              <path d="M52 33 Q54 22 64 21 Q74 22 76 33" fill="#2d1b00" />
              {/* Confused eyes ~ squiggles */}
              <path d="M58 37 Q59.5 35 61 37" stroke="#222" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M67 37 Q68.5 35 70 37" stroke="#222" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              {/* Thinking mouth */}
              <path d="M59 44 Q64 42 69 44" stroke="#222" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              {/* Question marks */}
              <text x="50" y="22" fontSize="10" fill="#f97316" opacity="0.8" fontWeight="700">?</text>
              <text x="70" y="18" fontSize="8" fill="#6b9bff" opacity="0.7" fontWeight="700">?</text>
              {/* Body */}
              <ellipse cx="64" cy="70" rx="14" ry="18" fill="#fde8d0" stroke="#222" strokeWidth="1.6" />
              <path d="M52 62 Q64 70 76 62" fill="#6b9bff" stroke="#4f46e5" strokeWidth="1.2" />

              {/* Tools floating right side */}
              <rect x="80" y="28" width="22" height="16" rx="4" fill="#fff0e8" stroke="#e88a3d" strokeWidth="1.3" />
              <text x="91" y="39" fontSize="6.5" fill="#e88a3d" textAnchor="middle" fontFamily="monospace" fontWeight="700">Slack</text>
              <rect x="80" y="50" width="22" height="16" rx="4" fill="#eef2ff" stroke="#6b9bff" strokeWidth="1.3" />
              <text x="91" y="61" fontSize="6.5" fill="#6b9bff" textAnchor="middle" fontFamily="monospace" fontWeight="700">JIRA</text>
              <rect x="80" y="72" width="22" height="16" rx="4" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.3" />
              <text x="91" y="83" fontSize="6.5" fill="#a855f7" textAnchor="middle" fontFamily="monospace" fontWeight="700">Email</text>
              {/* Dashed disconnect lines */}
              <line x1="78" y1="36" x2="78" y2="36" stroke="#ccc" strokeWidth="1" />
              <path d="M77 55 Q72 60 78 62" stroke="#ccc" strokeWidth="1" strokeDasharray="3" fill="none" />
            </svg>
            <div className={styles.painText}>AI tools exist but sit outside daily workflow</div>
          </div>
          
          {/* Card 3: Deadline crunch */}
          <div className={styles.painCard} style={{ transitionDelay: ".16s" }}>
            <svg className={styles.painDoodle} viewBox="0 0 110 110" fill="none">
              <circle cx="55" cy="55" r="48" fill="#fff7ed" opacity="0.6" />
              {/* Big clock */}
              <circle cx="65" cy="48" r="30" fill="white" stroke="#333" strokeWidth="2.5" />
              <circle cx="65" cy="48" r="27" fill="#fef9f0" />
              {/* Clock ticks */}
              <line x1="65" y1="21" x2="65" y2="26" stroke="#555" strokeWidth="2" strokeLinecap="round" />
              <line x1="65" y1="70" x2="65" y2="75" stroke="#555" strokeWidth="2" strokeLinecap="round" />
              <line x1="38" y1="48" x2="43" y2="48" stroke="#555" strokeWidth="2" strokeLinecap="round" />
              <line x1="87" y1="48" x2="92" y2="48" stroke="#555" strokeWidth="2" strokeLinecap="round" />
              {/* Clock hands pointing to almost-12 (deadline!) */}
              <line x1="65" y1="48" x2="65" y2="26" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
              <line x1="65" y1="48" x2="80" y2="36" stroke="#222" strokeWidth="2.2" strokeLinecap="round" />
              {/* Center dot */}
              <circle cx="65" cy="48" r="3" fill="#ef4444" />
              {/* Alarm bells */}
              <path d="M38 22 Q35 17 38 13" stroke="#f97316" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M92 22 Q95 17 92 13" stroke="#f97316" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M35 24 L41 24" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M89 24 L95 24" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />

              {/* Character panicking */}
              <circle cx="28" cy="64" r="13" fill="#fde8d0" stroke="#222" strokeWidth="1.8" />
              {/* Spiky panic hair */}
              <path d="M17 60 Q18 49 28 48 Q38 49 39 60" fill="#2d1b00" />
              <path d="M17 57 L14 50 L19 55" fill="#2d1b00" />
              <path d="M39 57 L42 50 L37 55" fill="#2d1b00" />
              <path d="M23 48 L21 42" stroke="#2d1b00" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M28 47 L28 41" stroke="#2d1b00" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M33 48 L35 42" stroke="#2d1b00" strokeWidth="2.5" strokeLinecap="round" />
              {/* Panic eyes wide open */}
              <circle cx="23" cy="63" r="3.5" fill="white" stroke="#222" strokeWidth="1" />
              <circle cx="33" cy="63" r="3.5" fill="white" stroke="#222" strokeWidth="1" />
              <circle cx="23" cy="63" r="1.8" fill="#2d1b00" />
              <circle cx="33" cy="63" r="1.8" fill="#2d1b00" />
              {/* Sweat drops */}
              <path d="M40 58 Q42 61 40 64 Q38 61 40 58Z" fill="#60a5fa" opacity="0.8" />
              <path d="M44 62 Q45.5 64.5 44 67 Q42.5 64.5 44 62Z" fill="#60a5fa" opacity="0.6" />
              {/* Open scream mouth */}
              <ellipse cx="28" cy="71" rx="4" ry="3" fill="#222" />
            </svg>
            <div className={styles.painText}>One extra client and one busy week breaks everything</div>
          </div>
          
          {/* Card 4: Juggling */}
          <div className={styles.painCard} style={{ transitionDelay: ".24s" }}>
            <svg className={styles.painDoodle} viewBox="0 0 110 110" fill="none">
              <circle cx="55" cy="55" r="48" fill="#f5f3ff" opacity="0.6" />
              {/* Central character juggling */}
              <circle cx="55" cy="42" r="14" fill="#fde8d0" stroke="#222" strokeWidth="1.8" />
              {/* Hair */}
              <path d="M43 38 Q45 27 55 26 Q65 27 67 38" fill="#2d1b00" />
              {/* Focused eyes */}
              <circle cx="50" cy="42" r="2.5" fill="white" />
              <circle cx="60" cy="42" r="2.5" fill="white" />
              <circle cx="50" cy="42" r="1.5" fill="#2d1b00" />
              <circle cx="60" cy="42" r="1.5" fill="#2d1b00" />
              <circle cx="50.5" cy="41.5" r="0.5" fill="white" />
              <circle cx="60.5" cy="41.5" r="0.5" fill="white" />
              {/* Determined smile */}
              <path d="M51 49 Q55 53 59 49" stroke="#222" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              {/* Body arms out */}
              <ellipse cx="55" cy="72" rx="13" ry="18" fill="#fde8d0" stroke="#222" strokeWidth="1.6" />
              <path d="M44 65 Q55 72 66 65" fill="#a855f7" stroke="#7c3aed" strokeWidth="1.2" />
              {/* Arms stretched wide */}
              <path d="M43 66 Q26 60 14 52" stroke="#fde8d0" strokeWidth="7" strokeLinecap="round" />
              <path d="M43 66 Q26 60 14 52" stroke="#222" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              <path d="M67 66 Q84 60 96 52" stroke="#fde8d0" strokeWidth="7" strokeLinecap="round" />
              <path d="M67 66 Q84 60 96 52" stroke="#222" strokeWidth="1.4" fill="none" strokeLinecap="round" />

              {/* Juggling balls: DB, API, UI, Git */}
              {/* DB ball - top left */}
              <circle cx="18" cy="24" r="13" fill="#e8f5ee" stroke="#3d9e6a" strokeWidth="1.8" />
              <ellipse cx="18" cy="21" rx="7" ry="3" fill="#3d9e6a" opacity="0.6" />
              <rect x="11" y="21" width="14" height="9" fill="#e8f5ee" stroke="#3d9e6a" strokeWidth="1" />
              <ellipse cx="18" cy="30" rx="7" ry="3" fill="#3d9e6a" opacity="0.4" />
              <text x="18" y="27" fontSize="5.5" fill="#3d9e6a" textAnchor="middle" fontWeight="700" fontFamily="monospace">DB</text>

              {/* API ball - top */}
              <circle cx="55" cy="12" r="13" fill="#fff0e8" stroke="#e88a3d" strokeWidth="1.8" />
              <text x="55" y="10" fontSize="5.5" fill="#e88a3d" textAnchor="middle" fontWeight="700" fontFamily="monospace">API</text>
              <rect x="46" y="11" width="18" height="11" rx="2" fill="#fff0e8" stroke="#e88a3d" strokeWidth="1" />
              <rect x="49" y="14" width="12" height="2" rx="1" fill="#e88a3d" opacity="0.5" />
              <rect x="49" y="17" width="8" height="2" rx="1" fill="#e88a3d" opacity="0.3" />

              {/* UI ball - top right */}
              <circle cx="92" cy="24" r="13" fill="#eef2ff" stroke="#6b9bff" strokeWidth="1.8" />
              <rect x="83" y="17" width="18" height="14" rx="3" fill="#dde9ff" stroke="#6b9bff" strokeWidth="1" />
              <rect x="85" y="19" width="6" height="4" rx="1" fill="#6b9bff" opacity="0.5" />
              <rect x="93" y="19" width="6" height="4" rx="1" fill="#6b9bff" opacity="0.3" />
              <text x="92" y="34" fontSize="5.5" fill="#6b9bff" textAnchor="middle" fontWeight="700" fontFamily="monospace">UI</text>

              {/* Dashed arcs showing juggle paths */}
              <path d="M28 30 Q42 15 45 18" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" fill="none" />
              <path d="M65 18 Q72 16 79 24" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" fill="none" />
              <path d="M11 46 Q10 35 12 28" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" fill="none" />
              <path d="M99 46 Q100 35 98 28" stroke="#ccc" strokeWidth="1" strokeDasharray="3,3" fill="none" />
            </svg>
            <div className={styles.painText}>Work scattered across too many tools and platforms</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
