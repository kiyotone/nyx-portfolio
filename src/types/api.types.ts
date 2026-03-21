/**
 * API-Related Types
 *
 * Types for API requests, responses, and error handling
 */

import type { PaginatedResponse, PaginationParams } from "./common.types";

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ApiError[];
}

/**
 * API error structure
 */
export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
}

/**
 * HTTP methods
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * API request configuration
 */
export interface ApiRequestConfig {
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  body?: unknown;
  timeout?: number;
}

/**
 * API error response
 */
export interface ApiErrorResponse {
  status: number;
  statusText: string;
  message: string;
  errors?: ValidationError[];
}

/**
 * Validation error
 */
export interface ValidationError {
  field: string;
  message: string;
  rule?: string;
}

/**
 * Generic list request params
 */
export interface ListRequestParams extends PaginationParams {
  search?: string;
  filters?: Record<string, unknown>;
}

/**
 * Generic list response
 */
export type ListResponse<T> = PaginatedResponse<T>;

/**
 * Create request (without id, timestamps)
 */
export type CreateRequest<T> = Omit<T, "id" | "createdAt" | "updatedAt">;

/**
 * Update request (all fields optional except id)
 */
export type UpdateRequest<T> = Partial<Omit<T, "id" | "createdAt" | "updatedAt">> & { id: string };

/**
 * Batch operation request
 */
export interface BatchRequest<T> {
  items: T[];
}

/**
 * Batch operation response
 */
export interface BatchResponse<T> {
  successful: T[];
  failed: Array<{
    item: T;
    error: string;
  }>;
}

/**
 * File upload response
 */
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

/**
 * API query tags for cache invalidation
 */
export type ApiTag =
  | "Auth"
  | "User"
  | "Customer"
  | "Subscription"
  | "Payment"
  | "Invoice"
  | "Report"
  | "Package"
  | "Transaction"
  | "Service";

/**
 * Query parameters for RTK Query
 */
export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  [key: string]: unknown;
}

/**
 * Mutation result wrapper
 */
export interface MutationResult<T = unknown> {
  data?: T;
  error?: ApiErrorResponse;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}
