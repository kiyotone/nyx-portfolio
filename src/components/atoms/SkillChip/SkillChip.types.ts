export interface SkillChipProps {
  name: string;
  icon?: React.ReactNode;
  level?: number;
  color?: "blue" | "pink" | "green" | "purple";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}
