/**
 * Common/Shared Types
 *
 * Types used across multiple features and components
 */

/**
 * Base entity interface that all domain entities extend
 */
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Status types used across the application
 */
export type Status = "active" | "inactive" | "suspended" | "pending" | "cancelled";

/**
 * Loading state
 */
export type LoadingState = "idle" | "loading" | "succeeded" | "failed";

/**
 * Date range for filtering
 */
export interface DateRange {
  startDate: string;
  endDate: string;
}

/**
 * Generic filter parameters
 */
export interface FilterParams {
  search?: string;
  status?: Status;
  dateRange?: DateRange;
}

/**
 * Sort configuration
 */
export interface SortConfig {
  field: string;
  direction: "asc" | "desc";
}

/**
 * Generic option for dropdowns/selects
 */
export interface Option<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * Address information
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
}

/**
 * Contact information
 */
export interface ContactInfo {
  email: string;
  phone: string;
  alternatePhone?: string;
}

/**
 * Money/Currency type
 */
export interface Money {
  amount: number;
  currency: string;
}

/**
 * File upload type
 */
export interface FileUpload {
  file: File;
  preview?: string;
  progress?: number;
  status?: "pending" | "uploading" | "success" | "error";
}

/**
 * Metadata for tracking changes
 */
export interface Metadata {
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  deletedAt?: string;
}

/**
 * Generic ID type for better type safety
 */
export type ID = string | number;

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null;

/**
 * Optional type helper
 */
export type Optional<T> = T | undefined;

/**
 * Deep partial - makes all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make specific fields required
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific fields optional
 */
export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
