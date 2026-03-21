export interface StatusIndicatorProps {
  status: "online" | "offline" | "busy" | "away";
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}
