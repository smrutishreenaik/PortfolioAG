import React from "react";
import styles from "./About.module.scss";

const About: React.FC = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.sectionWrap}>
        <div className={styles.aboutGrid}>
          <div>
            <div className={styles.sectionEyebrow}>About me</div>
            <div className={styles.sectionTitle}>The engineer behind the work</div>
            <div className={styles.aboutBody}>
              <p>
                I'm a Full-Stack Software Engineer based in Bengaluru with 3+
                years building secure, scalable platforms in C#, .NET Core, and
                React. Microsoft Azure certified.
              </p>
              <p>
                At Enstoa I reduced security vulnerabilities by 99% and saved
                70% of manual effort via Active Directory automation. At EPAM I
                resolved 600+ code issues and mentored 20+ engineers.
              </p>
              <p>
                Today at Mindfire Solutions I'm building a self-service web
                platform with 20+ features — still obsessing over clean,
                maintainable code.
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
            
            <div className={styles.highlightRow} style={{ transitionDelay: ".1s" }}>
              <div className={styles.hiIcon}>⚡</div>
              <div>
                <div className={styles.hiText}>Performance & reliability</div>
                <div className={styles.hiSub}>
                  Fixed deadlocks, boosted test coverage, cut post-deploy bugs by 15%
                </div>
              </div>
            </div>
            
            <div className={styles.highlightRow} style={{ transitionDelay: ".2s" }}>
              <div className={styles.hiIcon}>🤖</div>
              <div>
                <div className={styles.hiText}>AI-powered tooling</div>
                <div className={styles.hiSub}>
                  Built GPT-powered RFP staffing recommender using OpenAI API
                </div>
              </div>
            </div>
            
            <div className={styles.highlightRow} style={{ transitionDelay: ".3s" }}>
              <div className={styles.hiIcon}>🎓</div>
              <div>
                <div className={styles.hiText}>Mentorship & knowledge sharing</div>
                <div className={styles.hiSub}>
                  Trained 20+ interns; authored 100+ quiz questions for EPAM portal
                </div>
              </div>
            </div>
            
            <div className={styles.highlightRow} style={{ transitionDelay: ".4s" }}>
              <div className={styles.hiIcon}>☁️</div>
              <div>
                <div className={styles.hiText}>Microsoft Azure Certified</div>
                <div className={styles.hiSub}>
                  Azure Fundamentals — pipelines, boards, repos, branching
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
