/**
 * Standardized API Response structures for the Lumi ERP system.
 * These interfaces ensure consistency across all service endpoints.
 */

// Base interface for successful creation (201)
export interface CreatedResponse {
  status: 201;
  data: Record<string, any>;
  location: string;
}

// Base interface for client-side errors (400, 401, 403, 404, 503)
export interface ErrorResponse {
  status: 400 | 401 | 403 | 404 | 500 | 503;
  error: string;
  details?: string[]; // Used for 400 Bad Request
}

// Specialized interface for semantic validation errors (422)
export interface UnprocessableEntityResponse {
  status: 422;
  error: string;
  message: string;
  errors: Array<{
    field: string;
    issue: string;
  }>;
}

// Specialized interface for state conflicts (409)
export interface ConflictResponse {
  status: 409;
  error: "Conflict";
  message: string;
  details?: Record<string, any>;
}

// Specialized interface for rate limiting (429)
export interface RateLimitResponse {
  status: 429;
  error: string;
  retryAfter: number;
}

/**
 * Union type representing all possible standard API responses.
 * Logic layers should return these types to ensure frontend consistency.
 */
export type LumiApiResponse = 
  | CreatedResponse 
  | ErrorResponse 
  | UnprocessableEntityResponse 
  | ConflictResponse 
  | RateLimitResponse;