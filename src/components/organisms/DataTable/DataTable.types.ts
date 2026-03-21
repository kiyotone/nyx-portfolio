import type * as React from "react";

export interface Column<T> {
  /**
   * Unique key for the column (must be a key of T)
   */
  key: keyof T & string;

  /**
   * Column header label
   */
  label: string;

  /**
   * Whether the column is sortable
   * @default false
   */
  sortable?: boolean;

  /**
   * Custom render function for cell content
   */
  render?: (value: T[keyof T], row: T) => React.ReactNode;

  /**
   * Column width
   */
  width?: string;

  /**
   * Column alignment
   * @default "left"
   */
  align?: "left" | "center" | "right";
}

export interface SortConfig<T> {
  key: keyof T & string;
  direction: "asc" | "desc";
}

export interface DataTableProps<T extends Record<string, unknown>> extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onSelect"
> {
  /**
   * Table columns configuration
   */
  columns: Column<T>[];

  /**
   * Table data
   */
  data: T[];

  /**
   * Whether the table is loading
   * @default false
   */
  isLoading?: boolean;

  /**
   * Empty state message
   * @default "No data available"
   */
  emptyMessage?: string;

  /**
   * Enable row selection
   * @default false
   */
  selectable?: boolean;

  /**
   * Selected row keys
   */
  selectedRows?: string[];

  /**
   * Callback when row selection changes
   */
  onSelectionChange?: (selectedKeys: string[]) => void;

  /**
   * Row key field name
   * @default "id"
   */
  rowKey?: keyof T & string;

  /**
   * Callback when row is clicked
   */
  onRowClick?: (row: T) => void;

  /**
   * Enable sorting
   * @default false
   */
  sortable?: boolean;

  /**
   * Current sort configuration
   */
  sortConfig?: SortConfig<T>;

  /**
   * Callback when sort changes
   */
  onSortChange?: (key: keyof T & string, direction: "asc" | "desc") => void;

  /**
   * Enable pagination
   * @default false
   */
  paginated?: boolean;

  /**
   * Current page (1-indexed)
   * @default 1
   */
  currentPage?: number;

  /**
   * Items per page
   * @default 10
   */
  pageSize?: number;

  /**
   * Total number of items
   */
  totalItems?: number;

  /**
   * Callback when page changes
   */
  onPageChange?: (page: number) => void;
}
