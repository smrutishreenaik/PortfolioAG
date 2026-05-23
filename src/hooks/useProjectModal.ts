import { useState } from "react";

export interface ProjectMediaItem {
  type: "image" | "video";
  url: string;
  caption?: string;
}

export interface ProjectModalData {
  title: string;
  type: string;
  description: string;
  outcome: string;
  media: ProjectMediaItem[];
  order?: number;
  techStack?: string[];
  githubLink?: string;
  liveLink?: string;
}

const useProjectModal = () => {
  const [activeProject, setActiveProject] = useState<ProjectModalData | null>(
    null,
  );

  const openModal = (project: ProjectModalData) => setActiveProject(project);
  const closeModal = () => setActiveProject(null);

  return { activeProject, openModal, closeModal };
};

export default useProjectModal;
