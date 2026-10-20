/**
 * Logic layer utility to construct standardized responses.
 * Ensures that every controller output adheres to the defined JSON schemas.
 */

export const createResponse = {
  created: (data: object, location: string): SuccessResponse<object> => ({
    status: 201,
    data,
    location
  }),

  badRequest: (error: string, details?: string[]): ErrorResponse => ({
    status: 400,
    error,
    details
  }),

  unauthorized: (error: string): ErrorResponse => ({
    status: 401,
    error
  }),

  forbidden: (error: string): ErrorResponse => ({
    status: 403,
    error
  }),

  notFound: (error: string): ErrorResponse => ({
    status: 404,
    error
  }),

  conflict: (message: string, details?: object): ErrorResponse => ({
    status: 409,
    error: "Conflict",
    message,
    details
  }),

  unprocessable: (message: string, errors: ValidationError[]): ErrorResponse => ({
    status: 422,
    error: "Unprocessable Entity",
    message,
    errors
  }),

  tooManyRequests: (error: string, retryAfter: number): ErrorResponse => ({
    status: 429,
    error,
    retryAfter
  }),

  internalError: (error: string): ErrorResponse => ({
    status: 500,
    error
  }),

  serviceUnavailable: (error: string): ErrorResponse => ({
    status: 503,
    error
  })
};