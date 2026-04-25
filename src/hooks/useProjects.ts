import { useCollection } from "./useCollection";
import { Project } from "../types";
import { ProjectModalData } from "./useProjectModal";

const STATIC_FALLBACK: ProjectModalData[] = [
  {
    title: "AI Project Staffing Recommender",
    type: "AI · GPT · C#",
    description:
      "RFP documents requiring senior manual analysis were fed into a GPT pipeline that extracts role requirements and matches them to an internal skills database.",
    outcome:
      "~80% reduction in staffing decision time. Junior PMs now make confident decisions independently.",
    techStack: ["GPT-4", "C#", ".NET Core", "Azure", "REST API"],
    githubLink: "",
    liveLink: "",
    media: [],
  },
  {
    title: "Infrastructure Management Platform",
    type: "Security · Blazor · .NET Core",
    description:
      "Authentication rebuilt with JWT tokens and Active Directory integration, with hardened role-based access across the entire Blazor web application.",
    outcome:
      "Security vulnerabilities reduced by 99%. Manual provisioning effort down by 70%.",
    techStack: ["Blazor", ".NET Core", "JWT", "Active Directory", "SQL Server"],
    githubLink: "",
    liveLink: "",
    media: [],
  },
  {
    title: "Database Conversion Engine",
    type: "WPF · SQL · ETL",
    description:
      "Complex schema conversions previously done by hand were automated with WPF tooling, ETL pipelines, and data validation workflows.",
    outcome:
      "600+ legacy code issues resolved. Repeatable, error-free migrations with no manual intervention.",
    techStack: ["WPF", "C#", "SQL Server", "ETL", "SSMS"],
    githubLink: "",
    liveLink: "",
    media: [],
  },
  {
    title: "Self-Service Web Platform",
    type: ".NET Core · React · Self-Service",
    description:
      "Full-featured self-service platform with 20+ UI features and RESTful APIs built with .NET Core and React.js at Mindfire Solutions.",
    outcome:
      "10% faster releases, 10% more test coverage, 15% fewer post-deployment bugs.",
    techStack: [".NET Core", "React", "TypeScript", "REST API", "SQL Server"],
    githubLink: "",
    liveLink: "",
    media: [],
  },
];

const mapFirebaseProjectToModalData = (
  project: Project,
): ProjectModalData => ({
  title: project.title,
  type: project.techStack?.join(" · ") ?? "",
  description: project.description,
  outcome: project.features?.join(" ") ?? "",
  techStack: project.techStack ?? [],
  githubLink: project.githubLink ?? "",
  liveLink: project.liveLink ?? "",
  media: project.imageUrl
    ? [{ type: "image", url: project.imageUrl, caption: project.title }]
    : [],
});

const useProjects = () => {
  const { data: firebaseProjects, loading } = useCollection<Project>("projects");

  const projects: ProjectModalData[] =
    !loading && firebaseProjects.length > 0
      ? firebaseProjects.map(mapFirebaseProjectToModalData)
      : STATIC_FALLBACK;

  return { projects, loading };
};

export default useProjects;
