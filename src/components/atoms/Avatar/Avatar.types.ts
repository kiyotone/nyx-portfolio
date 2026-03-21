import type { AvatarSize, AvatarStatus, AvatarShape } from "@/types/component.types";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Size of the avatar
   * @default "md"
   */
  size?: AvatarSize;

  /**
   * Image source URL
   */
  src?: string;

  /**
   * Alt text for the image
   */
  alt?: string;

  /**
   * Fallback text (usually initials) when no image is provided
   */
  fallback?: string;

  /**
   * Status indicator
   */
  status?: AvatarStatus;

  /**
   * Shape of the avatar
   * @default "circle"
   */
  shape?: AvatarShape;
}
