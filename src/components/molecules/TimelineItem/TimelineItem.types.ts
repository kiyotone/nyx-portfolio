export interface TimelineItemProps {
  title: string;
  company?: string;
  date: string;
  description: string;
  type: "work" | "education" | "achievement";
  icon?: React.ReactNode;
  current?: boolean;
  className?: string;
}
