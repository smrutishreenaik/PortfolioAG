import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectModalData, ProjectMediaItem } from "../../hooks/useProjectModal";
import styles from "./ProjectModal.module.scss";

interface ProjectModalProps {
  project: ProjectModalData | null;
  onClose: () => void;
}

const isYouTubeUrl = (url: string) =>
  /youtube\.com|youtu\.be/.test(url);

const getYouTubeEmbedUrl = (url: string): string => {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const MediaSlide: React.FC<{ item: ProjectMediaItem; isActive: boolean }> = ({
  item,
  isActive,
}) => {
  if (item.type === "video") {
    if (isYouTubeUrl(item.url)) {
      return (
        <iframe
          className={styles.mediaVideo}
          src={isActive ? getYouTubeEmbedUrl(item.url) : ""}
          title="Project video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }
    return (
      <video
        className={styles.mediaVideo}
        src={item.url}
        controls
        autoPlay={false}
      />
    );
  }
  return (
    <img className={styles.mediaImage} src={item.url} alt={item.caption ?? "Project screenshot"} />
  );
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);


  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") {
        if (lightboxOpen) setLightboxOpen(false);
        else onClose();
      }
      if (!project.media.length) return;
      if (e.key === "ArrowRight")
        setActiveIndex((prev) => (prev + 1) % project.media.length);
      if (e.key === "ArrowLeft")
        setActiveIndex(
          (prev) => (prev - 1 + project.media.length) % project.media.length,
        );
    },
    [project, lightboxOpen, onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const hasPrevSlide = project && project.media.length > 1;
  const hasNextSlide = project && project.media.length > 1;

  const goToPrev = () => {
    if (!project) return;
    setActiveIndex((prev) => (prev - 1 + project.media.length) % project.media.length);
  };

  const goToNext = () => {
    if (!project) return;
    setActiveIndex((prev) => (prev + 1) % project.media.length);
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              if (e.target === overlayRef.current) onClose();
            }}
          >
            {/* Panel */}
            <motion.div
              className={styles.panel}
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close button */}
              <button
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close project modal"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 5L15 15M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className={styles.layout}>
                {/* Left: Media gallery */}
                <div className={styles.galleryCol}>
                  {project.media.length > 0 ? (
                    <>
                      <div
                        className={styles.mainMediaWrapper}
                        onClick={() =>
                          project.media[activeIndex]?.type === "image" &&
                          setLightboxOpen(true)
                        }
                        style={{
                          cursor:
                            project.media[activeIndex]?.type === "image"
                              ? "zoom-in"
                              : "default",
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeIndex}
                            className={styles.mainMediaInner}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.25 }}
                          >
                            <MediaSlide
                              item={project.media[activeIndex]}
                              isActive
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Nav arrows */}
                        {hasPrevSlide && (
                          <button
                            className={`${styles.navArrow} ${styles.navArrowLeft}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              goToPrev();
                            }}
                            aria-label="Previous media"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M13 4L7 10L13 16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        )}
                        {hasNextSlide && (
                          <button
                            className={`${styles.navArrow} ${styles.navArrowRight}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              goToNext();
                            }}
                            aria-label="Next media"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="M7 4L13 10L7 16"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Caption */}
                      {project.media[activeIndex]?.caption && (
                        <p className={styles.mediaCaption}>
                          {project.media[activeIndex].caption}
                        </p>
                      )}

                      {/* Thumbnails */}
                      {project.media.length > 1 && (
                        <div className={styles.thumbnailStrip}>
                          {project.media.map((item, idx) => (
                            <button
                              key={idx}
                              className={`${styles.thumbnail} ${idx === activeIndex ? styles.thumbnailActive : ""}`}
                              onClick={() => setActiveIndex(idx)}
                              aria-label={`View media ${idx + 1}`}
                            >
                              {item.type === "image" ? (
                                <img src={item.url} alt={item.caption ?? ""} />
                              ) : (
                                <div className={styles.videoThumb}>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      fill="rgba(255,255,255,0.15)"
                                    />
                                    <path
                                      d="M10 8L16 12L10 16V8Z"
                                      fill="white"
                                    />
                                  </svg>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Dot indicators */}
                      <div className={styles.dotRow}>
                        {project.media.map((_, idx) => (
                          <button
                            key={idx}
                            className={`${styles.dot} ${idx === activeIndex ? styles.dotActive : ""}`}
                            onClick={() => setActiveIndex(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className={styles.noMedia}>
                      <svg
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                      >
                        <rect
                          width="48"
                          height="48"
                          rx="12"
                          fill="rgba(255,255,255,0.05)"
                        />
                        <path
                          d="M14 34L20 26L25 31L30 24L34 34H14Z"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="1.5"
                          fill="none"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="18"
                          cy="19"
                          r="4"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <p>No media available for this project</p>
                    </div>
                  )}
                </div>

                {/* Right: Info panel */}
                <div className={styles.infoCol}>
                  <span className={styles.projectType}>{project.type}</span>
                  <h2 className={styles.projectTitle}>{project.title}</h2>

                  <div className={styles.infoBlock}>
                    <span className={styles.infoLabel}>What changed</span>
                    <p className={styles.infoText}>{project.description}</p>
                  </div>

                  <div className={styles.infoBlock}>
                    <span className={`${styles.infoLabel} ${styles.green}`}>
                      Outcome
                    </span>
                    <p className={styles.infoText}>{project.outcome}</p>
                  </div>

                  {project.techStack && project.techStack.length > 0 && (
                    <div className={styles.techStack}>
                      {project.techStack.map((tech) => (
                        <span key={tech} className={styles.techPill}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className={styles.actionLinks}>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkBtn}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.linkBtn} ${styles.linkBtnPrimary}`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Lightbox for images */}
          <AnimatePresence>
            {lightboxOpen && project.media[activeIndex]?.type === "image" && (
              <motion.div
                className={styles.lightbox}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxOpen(false)}
              >
                <motion.img
                  src={project.media[activeIndex].url}
                  alt={project.media[activeIndex].caption ?? ""}
                  className={styles.lightboxImage}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  className={styles.lightboxClose}
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close lightbox"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
