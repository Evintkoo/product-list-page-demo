/**
 * Node: 500 Internal Server Error Shape (ae2dbd43-0cb6-4619-9f26-f90961decc1c)
 * Defines the structure for unexpected server failures.
 */
interface InternalErrorResponse {
  error: string; // "Unexpected server error"
  code: "INTERNAL_ERROR";
}

/**
 * Node: 400 Bad Request Shape (6a708fc1-7ad0-4804-a04b-fcb9165899b4)
 * Defines the structure for malformed requests.
 * Receives: Trigger from Logic swimlane "400 Bad Request i"
 */
interface BadRequestResponse {
  error: string; // "Invalid product id"
  code: "BAD_REQUEST";
}

/**
 * Node: 404 Not Found Shape (8f2983e6-71a4-445a-9127-a4fbbf368bf8)
 * Defines the structure for missing products or missing pricing configurations.
 * Receives: Trigger from Logic swimlane "404 Not Found"
 */
interface NotFoundResponse {
  error: string; // "Product not found or has no warehouse pricing"
  code: "NOT_FOUND";
}

/**
 * Node: 401/403 Error Shape (0b685532-8685-4c03-a205-e0ce868e20c9)
 * Defines the structure for authorization failures.
 * Receives: Trigger from Logic swimlane "401 Unauthorized or 403 Forbidden i"
 */
interface AuthErrorResponse {
  error: string; // "Not authorized to view pricing data"
  code: "UNAUTHORIZED" | "FORBIDDEN";
}