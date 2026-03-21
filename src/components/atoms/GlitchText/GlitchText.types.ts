export interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: "low" | "medium" | "high";
  glitchColor?: "blue" | "pink" | "green" | "purple";
  animated?: boolean;
}
