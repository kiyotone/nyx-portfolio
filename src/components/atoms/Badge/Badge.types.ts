import type { BadgeVariant, BadgeSize } from "@/types/component.types";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the badge
   * @default "default"
   */
  variant?: BadgeVariant;

  /**
   * Size of the badge
   * @default "md"
   */
  size?: BadgeSize;

  /**
   * Show a dot indicator
   * @default false
   */
  dot?: boolean;

  /**
   * Make badge removable with close button
   * @default false
   */
  removable?: boolean;

  /**
   * Callback when close button is clicked
   */
  onRemove?: () => void;

  /**
   * Icon to display before children
   */
  iconBefore?: React.ReactNode;

  /**
   * Icon to display after children
   */
  iconAfter?: React.ReactNode;

  /**
   * Badge content
   */
  children?: React.ReactNode;
}
