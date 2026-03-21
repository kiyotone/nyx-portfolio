import type { ReactNode } from "react";

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface DashboardFilter {
  label: string;
  value: string;
  active: boolean;
  count?: number;
  disabled?: boolean;
  onClick?: () => void;
}

export interface DashboardStat {
  id: string;
  /** Display title (maps to StatCard's label prop) */
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    trend?: "up" | "down" | "neutral";
    label?: string;
  };
  icon?: ReactNode;
  isLoading?: boolean;
  href?: string;
}

export interface DashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Dashboard title */
  title?: string;
  /** Dashboard description/subtitle */
  description?: string;
  /** Breadcrumb navigation items */
  breadcrumbs?: Breadcrumb[];
  /** Statistics cards to display */
  stats?: DashboardStat[];
  /** Number of columns for stats grid (1-4) */
  statsColumns?: 1 | 2 | 3 | 4;
  /** Main content area */
  children?: ReactNode;
  /** Actions to display in header (buttons, etc) */
  headerActions?: ReactNode;
  /** Loading state for all stats */
  isLoading?: boolean;
  /** Filter/tab buttons */
  filters?: DashboardFilter[];
  /** Optional sidebar content */
  sidebar?: ReactNode;
  /** Use full width layout (no max-width constraint) */
  fullWidth?: boolean;
}
