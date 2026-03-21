export interface GameCardProps {
  title: string;
  platform: "steam" | "xbox" | "playstation" | "switch" | "pc";
  coverImage?: string;
  hoursPlayed: number;
  achievements?: number;
  totalAchievements?: number;
  favorite?: boolean;
  genre?: string;
  className?: string;
}
