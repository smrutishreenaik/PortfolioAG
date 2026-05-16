import React from "react";
import styles from "./About.module.scss";

const About: React.FC = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.sectionWrap}>
        <div className={styles.aboutGrid}>
          <div>
            <div className={styles.sectionEyebrow}>About Me</div>
            <div className={styles.aboutBody}>
              <p>
                I am a Senior Software Engineer with 4+ years of experience
                building secure, high-performance systems. I focus heavily on
                System Design and Data Structures &amp; Algorithms to ensure the
                platforms I build can scale efficiently.
              </p>
              <h3>How I Work</h3>
              <p>
                I take complete ownership of my engineering deliverables. From
                estimating story points and clarifying requirements directly
                from tickets, to deep-diving into documentation, I independently
                execute features without needing direct oversight. I am also an
                AI-augmented developer, utilizing advanced AI tools to learn
                faster, solve complex architectural challenges, and enforce
                rigorous code quality.
              </p>
              <h3>My Track Record</h3>
              <p>
                Mindfire Solutions : Currently building and scaling a
                comprehensive self-service web platform, independently balancing
                complex feature development with high-priority production
                triage.
              </p>
              <p>
                ENSTOA : Slashed security vulnerabilities by 99% and reduced
                manual administrative workflows by 70% through robust
                authentication automation.
              </p>
              <p>
                EPAM Systems : Resolved 600+ code quality issues and actively
                mentored 20+ engineers to accelerate team onboarding.
              </p>
            </div>
          </div>

          <div className={styles.aboutHighlights}>
            <div className={styles.highlightRow}>
              <div className={styles.hiIcon}>🛡️</div>
              <div>
                <div className={styles.hiText}>Security-first engineering</div>
                <div className={styles.hiSub}>
                  Reduced vulnerabilities by 99% via JWT + AD hardening
                </div>
              </div>
            </div>

            <div
              className={styles.highlightRow}
              style={{ transitionDelay: ".1s" }}
            >
              <div className={styles.hiIcon}>⚡</div>
              <div>
                <div className={styles.hiText}>
                  Autonomous execution &amp; reliability
                </div>
                <div className={styles.hiSub}>
                  Independently drive features from raw tickets to production,
                  resolving critical production issues and cutting post-deploy
                  bugs by 15%
                </div>
              </div>
            </div>

            <div
              className={styles.highlightRow}
              style={{ transitionDelay: ".2s" }}
            >
              <div className={styles.hiIcon}>🧠</div>
              <div>
                <div className={styles.hiText}>
                  System Design &amp; core fundamentals
                </div>
                <div className={styles.hiSub}>
                  Rigorously focused on DSA and System Design to architect
                  highly scalable, language-agnostic platforms
                </div>
              </div>
            </div>

            <div
              className={styles.highlightRow}
              style={{ transitionDelay: ".3s" }}
            >
              <div className={styles.hiIcon}>🤖</div>
              <div>
                <div className={styles.hiText}>AI-augmented development</div>
                <div className={styles.hiSub}>
                  Extensively leverage AI for complex problem-solving and code
                  reviews, alongside building a GPT-powered RFP recommender
                </div>
              </div>
            </div>

            <div
              className={styles.highlightRow}
              style={{ transitionDelay: ".4s" }}
            >
              <div className={styles.hiIcon}>☁️</div>
              <div>
                <div className={styles.hiText}>Cloud infrastructure &amp; Azure</div>
                <div className={styles.hiSub}>
                  Microsoft Azure Certified — experienced with CI/CD, cloud
                  management, and asynchronous messaging via Azure Service Bus
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
