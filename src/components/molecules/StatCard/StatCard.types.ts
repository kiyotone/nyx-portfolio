import type { BadgeProps } from "@/components/atoms/Badge";
import type * as React from "react";

// Base props that are common to both variants
interface BaseStatCardProps {
  /**
   * The main statistic value
   */
  value: string | number;

  /**
   * Label for the statistic
   */
  label: string;

  /**
   * Optional icon component
   */
  icon?: React.ReactNode;

  /**
   * Change percentage or description with trend indicator
   */
  change?: {
    value: string | number;
    trend?: "up" | "down" | "neutral";
    label?: string;
  };

  /**
   * Additional description or helper text
   */
  description?: string;

  /**
   * Badge to display next to label
   */
  badge?: {
    label: string;
    variant?: BadgeProps["variant"];
  };

  /**
   * Whether the card is loading
   * @default false
   */
  isLoading?: boolean;

  /**
   * Visual variant of the card
   * @default "default"
   */
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info";

  /**
   * Size of the card
   * @default "default"
   */
  size?: "sm" | "default" | "lg";

  /**
   * Footer content
   */
  footer?: React.ReactNode;

  /**
   * Tooltip text for info icon
   */
  tooltip?: string;

  /**
   * Status indicator
   */
  status?: {
    label: string;
    type: "success" | "warning" | "error" | "info";
  };
}

// When href is provided, it's an anchor element
type StatCardAsLink = BaseStatCardProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseStatCardProps | "href"> & {
    /**
     * Makes the card a clickable link
     */
    href: string;
    /**
     * Optional click handler for anchor element
     */
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  };

// When href is not provided, it's a div element
type StatCardAsDiv = BaseStatCardProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseStatCardProps> & {
    /**
     * href is not available for div variant
     */
    href?: never;
    /**
     * Optional click handler for div element
     */
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  };

/**
 * StatCard can be either a link (when href is provided) or a div
 */
export type StatCardProps = StatCardAsLink | StatCardAsDiv;
