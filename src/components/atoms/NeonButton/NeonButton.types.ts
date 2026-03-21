import { ButtonHTMLAttributes } from "react";

export interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "blue" | "pink" | "green" | "purple" | "yellow";
  size?: "sm" | "md" | "lg";
  glowIntensity?: "low" | "medium" | "high";
  children: React.ReactNode;
}
