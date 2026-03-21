import type * as React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Array of breadcrumb items
   */
  items: BreadcrumbItem[];

  /**
   * Separator between items
   * @default "/"
   */
  separator?: React.ReactNode;

  /**
   * Maximum items to show before truncating
   */
  maxItems?: number;
}
