export interface ProgressBarProps {
  value: number;
  max?: number;
  color?: "blue" | "pink" | "green" | "purple";
  label?: string;
  showPercentage?: boolean;
  animated?: boolean;
  className?: string;
}
