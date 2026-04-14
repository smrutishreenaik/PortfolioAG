import React, { useState, useEffect } from "react";
import styles from "./Hero.module.scss";

const ROLES = [
  "Full-Stack Builder.",
  "Problem Solver.",
  ".NET Developer."
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentRole = ROLES[roleIndex];
    
    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      } else {
        timeout = setTimeout(() => {
          setText(currentRole.substring(0, text.length - 1));
        }, 50);
      }
    } else {
      if (text === currentRole) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      } else {
        timeout = setTimeout(() => {
          setText(currentRole.substring(0, text.length + 1));
        }, 100);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <div className={styles.heroOuter}>
      <div className={styles.hero} id="home">
        <div>
          <div className={styles.heroTag}>Available for opportunities</div>
          <h1 className={styles.heroTitle}>
            Smrutishree Naik.<br />
            <em className={styles.roleText}>
              {text}
              <span className={styles.cursor}>|</span>
            </em>
          </h1>
          <p className={styles.heroDesc}>
            I'm Smrutishree — a C# / .NET Full-Stack Engineer with 3+ years
            building secure, scalable web platforms. I ship features that matter
            and mentor teams to grow.
          </p>
          <div className={styles.heroBtns}>
            <a className={styles.btnPrimary} href="#projects">
              View My Work
            </a>
            <a className={styles.btnSecondary} href="#contact">
              Get In Touch
            </a>
          </div>
        </div>
        <div className={styles.heroRight}>
          <svg
            width="290"
            height="290"
            viewBox="0 0 290 290"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background blobs */}
            <circle cx="145" cy="145" r="120" fill="#f0fdf4" opacity="0.6" />
            <circle cx="210" cy="80" r="40" fill="#e8f5ee" opacity="0.8" />
            <circle cx="70" cy="200" r="30" fill="#eef2ff" opacity="0.7" />

            {/* Desk */}
            <rect x="30" y="218" width="230" height="10" rx="5" fill="#d6d3ca" stroke="#bbb" strokeWidth="1.2" />
            <rect x="55" y="228" width="10" height="40" rx="5" fill="#d6d3ca" />
            <rect x="225" y="228" width="10" height="40" rx="5" fill="#d6d3ca" />

            {/* Monitor body */}
            <rect x="68" y="136" width="144" height="82" rx="10" fill="#1e1e2e" stroke="#333" strokeWidth="2" />
            {/* Screen glow */}
            <rect x="78" y="145" width="124" height="64" rx="5" fill="#0f172a" />
            {/* Code: line 1 */}
            <rect x="86" y="154" width="18" height="5" rx="2" fill="#f97316" />
            <rect x="110" y="154" width="44" height="5" rx="2" fill="#3d9e6a" />
            <rect x="160" y="154" width="22" height="5" rx="2" fill="#a78bfa" />
            {/* Code: line 2 */}
            <rect x="92" y="164" width="30" height="5" rx="2" fill="#60a5fa" />
            <rect x="128" y="164" width="52" height="5" rx="2" fill="#f0f0f0" opacity="0.5" />
            {/* Code: line 3 */}
            <rect x="92" y="174" width="48" height="5" rx="2" fill="#3d9e6a" />
            <rect x="146" y="174" width="28" height="5" rx="2" fill="#f97316" opacity="0.7" />
            {/* Code: line 4 */}
            <rect x="86" y="184" width="70" height="5" rx="2" fill="#f0f0f0" opacity="0.3" />
            {/* blinking cursor */}
            <rect x="160" y="183" width="3" height="7" rx="1" fill="#60a5fa" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0;0.9" dur="1s" repeatCount="indefinite" />
            </rect>
            {/* Stand */}
            <rect x="132" y="218" width="16" height="6" rx="2" fill="#aaa" />
            <rect x="120" y="224" width="40" height="4" rx="2" fill="#aaa" />
            {/* Keyboard */}
            <rect x="82" y="210" width="96" height="10" rx="4" fill="#c8c5be" stroke="#bbb" strokeWidth="1" />
            {/* Keys */}
            <rect x="88" y="212" width="6" height="5" rx="1.5" fill="#ede9e3" />
            <rect x="97" y="212" width="6" height="5" rx="1.5" fill="#ede9e3" />
            <rect x="106" y="212" width="6" height="5" rx="1.5" fill="#ede9e3" />
            <rect x="115" y="212" width="6" height="5" rx="1.5" fill="#ede9e3" />
            <rect x="124" y="212" width="6" height="5" rx="1.5" fill="#ede9e3" />
            <rect x="133" y="212" width="6" height="5" rx="1.5" fill="#ede9e3" />
            <rect x="142" y="212" width="6" height="5" rx="1.5" fill="#ede9e3" />
            <rect x="151" y="212" width="6" height="5" rx="1.5" fill="#ede9e3" />
            <rect x="160" y="212" width="6" height="5" rx="1.5" fill="#ede9e3" />

            {/* Character body */}
            <ellipse cx="205" cy="196" rx="22" ry="25" fill="#fde8d0" />
            <ellipse cx="205" cy="196" rx="22" ry="25" fill="none" stroke="#222" strokeWidth="1.8" />
            {/* Collar/shirt */}
            <path d="M185 210 Q195 225 205 222 Q215 225 225 210" fill="#3d9e6a" stroke="#2a7a52" strokeWidth="1.2" />
            {/* Shirt bottom */}
            <path d="M183 215 Q205 235 227 215" fill="#3d9e6a" />

            {/* Head */}
            <circle cx="205" cy="164" r="21" fill="#fde8d0" stroke="#222" strokeWidth="1.8" />
            {/* Hair */}
            <path d="M185 158 Q187 139 205 137 Q223 139 225 158" fill="#2d1b00" />
            {/* Hair detail */}
            <path d="M186 153 Q190 143 200 141" stroke="#1a0f00" strokeWidth="1" fill="none" />
            <path d="M224 153 Q220 143 210 141" stroke="#1a0f00" strokeWidth="1" fill="none" />

            {/* Eyes: happy & bright */}
            <circle cx="198" cy="164" r="3.5" fill="white" />
            <circle cx="212" cy="164" r="3.5" fill="white" />
            <circle cx="199" cy="164" r="2.2" fill="#2d1b00" />
            <circle cx="213" cy="164" r="2.2" fill="#2d1b00" />
            {/* Eye shine */}
            <circle cx="200" cy="163" r="0.8" fill="white" />
            <circle cx="214" cy="163" r="0.8" fill="white" />

            {/* Smile */}
            <path d="M196 172 Q205 179 214 172" stroke="#222" strokeWidth="1.8" fill="none" strokeLinecap="round" />

            {/* Arm pointing at screen */}
            <path d="M184 198 Q172 194 155 192" stroke="#fde8d0" strokeWidth="7" strokeLinecap="round" />
            <path d="M184 198 Q172 194 155 192" stroke="#222" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            {/* pointing finger */}
            <circle cx="152" cy="191" r="4" fill="#fde8d0" stroke="#222" strokeWidth="1.4" />

            {/* Coffee mug */}
            <rect x="226" y="202" width="18" height="15" rx="3" fill="white" stroke="#333" strokeWidth="1.6" />
            <path d="M244 207 Q250 207 250 212 Q250 217 244 217" stroke="#333" strokeWidth="1.5" fill="none" />
            <rect x="228" y="202" width="14" height="5" rx="2" fill="#c8956a" />
            {/* Coffee steam */}
            <path d="M231 199 Q232 195 231 191" stroke="#ccc" strokeWidth="1.2" fill="none" strokeLinecap="round">
              <animate attributeName="d" values="M231 199 Q232 195 231 191;M231 199 Q234 195 231 191;M231 199 Q232 195 231 191" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M236 198 Q237 194 236 190" stroke="#ccc" strokeWidth="1.2" fill="none" strokeLinecap="round" />

            {/* Floating badges */}
            <rect x="30" y="90" width="48" height="22" rx="11" fill="#e8f5ee" stroke="#3d9e6a" strokeWidth="1.2" />
            <text x="54" y="105" fontSize="10" fontFamily="monospace" fill="#3d9e6a" textAnchor="middle" fontWeight="700">C#</text>

            <rect x="30" y="150" width="48" height="22" rx="11" fill="#eef2ff" stroke="#6b9bff" strokeWidth="1.2" />
            <text x="54" y="165" fontSize="9" fontFamily="monospace" fill="#6b9bff" textAnchor="middle" fontWeight="700">.NET</text>

            <rect x="210" y="95" width="56" height="22" rx="11" fill="#fff0e8" stroke="#e88a3d" strokeWidth="1.2" />
            <text x="238" y="110" fontSize="9" fontFamily="monospace" fill="#e88a3d" textAnchor="middle" fontWeight="700">React</text>

            {/* Sparkles */}
            <path d="M250 130 l3 6 l6 3 l-6 3 l-3 6 l-3-6 l-6-3 l6-3z" fill="#3d9e6a" opacity="0.6">
              <animateTransform attributeName="transform" type="rotate" from="0 250 139" to="360 250 139" dur="6s" repeatCount="indefinite" />
            </path>
            <path d="M48 125 l2 4.5 l4.5 2 l-4.5 2 l-2 4.5 l-2-4.5 l-4.5-2 l4.5-2z" fill="#6b9bff" opacity="0.5" />
            <path d="M175 105 l1.5 3 l3 1.5 l-3 1.5 l-1.5 3 l-1.5-3 l-3-1.5 l3-1.5z" fill="#f97316" opacity="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Hero;
