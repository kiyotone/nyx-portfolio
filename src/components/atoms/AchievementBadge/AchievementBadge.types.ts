export interface AchievementBadgeProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  unlocked?: boolean;
  date?: string;
  rarity?: "common" | "rare" | "epic" | "legendary";
  className?: string;
}
