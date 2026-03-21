import type * as React from "react";

export interface DropdownItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Trigger element (button/link that opens dropdown)
   */
  trigger: React.ReactNode;

  /**
   * Dropdown menu items
   */
  items: DropdownItem[];

  /**
   * Alignment of dropdown menu
   * @default "left"
   */
  align?: "left" | "right";

  /**
   * Whether dropdown is open (controlled)
   */
  open?: boolean;

  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
}
