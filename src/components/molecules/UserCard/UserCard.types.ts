import type { AvatarProps } from "@/components/atoms/Avatar";
import type { BadgeProps } from "@/components/atoms/Badge";

export interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * User's avatar image URL
   */
  avatarSrc?: string;

  /**
   * User's name
   */
  name: string;

  /**
   * User's title or role
   */
  title?: string;

  /**
   * User's email or additional info
   */
  email?: string;

  /**
   * Avatar size
   * @default "md"
   */
  avatarSize?: AvatarProps["size"];

  /**
   * Avatar status
   */
  status?: AvatarProps["status"];

  /**
   * Badge to display (e.g., "Admin", "Pro")
   */
  badge?: {
    label: string;
    variant?: BadgeProps["variant"];
  };

  /**
   * Optional action button or element
   */
  action?: React.ReactNode;
}
