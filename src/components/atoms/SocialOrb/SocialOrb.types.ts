export interface SocialOrbProps {
  platform:
    | "github"
    | "linkedin"
    | "twitter"
    | "discord"
    | "email"
    | "steam"
    | "xbox"
    | "playstation";
  url: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}
