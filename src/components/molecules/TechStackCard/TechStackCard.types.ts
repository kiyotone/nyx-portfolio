export interface TechStackCardProps {
  name: string;
  icon?: React.ReactNode;
  description: string;
  proficiency: number;
  yearsOfExperience?: number;
  category: "frontend" | "backend" | "devops" | "gaming";
  className?: string;
}
