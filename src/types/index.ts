export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  techStack: string[];
  githubLink: string;
  liveLink: string;
  imageUrl?: string;
  createdAt?: any;
}

export interface CaseStudy {
  id: string;
  title: string;
  content: string; // Rich text or HTML content
  imageUrl?: string;
  createdAt?: any;
}

export interface Experience {
  id: string;
  companyName: string;
  logoUrl?: string;
  timePeriod: string;
  role: string;
  achievements: string[];
  companyWebsite: string;
  createdAt?: any;
}

export interface Testimonial {
  id: string;
  personName: string;
  quote: string;
  linkedinUrl: string;
  profilePicUrl?: string;
  position: string;
  company: string;
  recommendedDate?: string;
  createdAt?: any;
}

export interface Skill {
  id: string;
  name: string;
  type: "frontend" | "backend" | "tools" | "other";
  createdAt?: any;
}
