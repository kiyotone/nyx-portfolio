export interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  techStack: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: "web" | "mobile" | "game" | "tool";
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  className?: string;
}
