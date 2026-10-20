/**
 * Standardized API response structures based on HTTP status codes.
 * These interfaces ensure consistency across all service endpoints.
 */

export interface SuccessResponse<T> {
  status: 201;
  data: T;
  location: string;
}

export interface ErrorResponse {
  status: 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 503;
  error: string;
  message?: string;
  details?: string[] | ValidationError[];
  retryAfter?: number;
}

export interface ValidationError {
  field: string;
  issue: string;
}