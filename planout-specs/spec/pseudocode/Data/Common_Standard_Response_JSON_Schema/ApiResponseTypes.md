/**
 * Standardized API response structures based on HTTP status codes.
 * These interfaces serve as the contract for all API endpoints in the ERP system.
 */

export interface BaseResponse {
  status: number;
}

export interface SuccessResponse<T> extends BaseResponse {
  status: 201;
  data: T;
  location: string;
}

export interface ErrorResponse extends BaseResponse {
  error: string;
  message?: string;
}

export interface ValidationErrorResponse extends ErrorResponse {
  status: 400 | 422;
  details?: string[]; // For 400 Bad Request
  errors?: { field: string; issue: string }[]; // For 422 Unprocessable Entity
}

export interface ConflictResponse extends ErrorResponse {
  status: 409;
  error: "Conflict";
  message: string;
  details?: object;
}

export interface RateLimitResponse extends ErrorResponse {
  status: 429;
  retryAfter: number;
}