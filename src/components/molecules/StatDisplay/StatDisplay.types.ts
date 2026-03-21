export interface StatDisplayProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: "blue" | "pink" | "green" | "purple";
  animated?: boolean;
  suffix?: string;
  className?: string;
}
