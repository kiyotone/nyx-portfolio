import type * as React from "react";
import type { BadgeProps } from "@/components/atoms/Badge";

export interface NavItemProps extends Omit<React.HTMLAttributes<HTMLElement>, "onClick"> {
  /**
   * The navigation label/text
   */
  label: string;

  /**
   * URL for the navigation link
   */
  href?: string;

  /**
   * Click handler for button-style nav items
   */
  onClick?: () => void;

  /**
   * Icon to display (left side)
   */
  icon?: React.ReactNode;

  /**
   * Icon to display (right side)
   */
  iconRight?: React.ReactNode;

  /**
   * Whether this item is currently active
   * If not provided, will auto-detect based on current route (Next.js only)
   * @default undefined (auto-detect)
   */
  active?: boolean;

  /**
   * Use exact path matching for active state detection
   * - true: Only active when pathname exactly matches href (/dashboard !== /dashboard/settings)
   * - false: Active when pathname starts with href (/dashboard matches /dashboard/settings)
   * @default false
   */
  exactMatch?: boolean;

  /**
   * Badge to display (notification count, etc)
   */
  badge?: {
    label: string | number;
    variant?: BadgeProps["variant"];
  };

  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Visual variant
   * @default "default"
   */
  variant?: "default" | "ghost" | "primary";

  /**
   * Size variant
   * @default "default"
   */
  size?: "sm" | "default" | "lg";

  /**
   * Whether to show as external link (opens in new tab)
   * @default false
   */
  external?: boolean;

  /**
   * Whether to collapse label (icon only)
   * @default false
   */
  collapsed?: boolean;
}
