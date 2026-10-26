/**
 * Node: 404 Not Found JSON Schema (5b7a384f-3540-48d4-ab69-db1cf3f8b4af)
 * Interface: Returns { error: string, message: string }
 */
const NotFoundError = {
    error: "Not Found",
    message: "Product not found or No history found for this product"
};

/**
 * Node: 401 Unauthorized JSON Schema (2e3994bb-5eef-46e7-b4b8-a6c99971450d)
 * Interface: Returns { error: string, message: string }
 */
const UnauthorizedError = {
    error: "Unauthorized",
    message: "Missing or invalid authentication credentials"
};

/**
 * Node: 400 Bad Request JSON Schema (eefd93e3-003c-4c10-b8e2-17f83a9a57bd)
 * Interface: Returns { error: string, message: string, invalid_params: Array<{field, reason}> }
 */
const BadRequestError = {
    error: "Bad Request",
    message: "The query parameters are malformed or invalid",
    invalid_params: [] // Populated by validation middleware
};

/**
 * Node: 500 Internal Server Error JSON Schema (af1fcc43-6009-46f8-85d5-b4d234c0c6b2)
 * Interface: Returns { error: string, message: string, trace_id: string }
 */
const InternalServerError = {
    error: "Internal Server Error",
    message: "An unexpected server error occurred",
    trace_id: "uuid-generated-by-logger"
};

/**
 * Notes covered:
 * - 404: 'Product not found' or 'No history found for this product'.
 * - 401: Standard error and message fields.
 * - 400: Includes invalid_params array with field and reason.
 * - 500: Includes trace_id for debugging.
 */

<!-- SCHEMA
{
  "entities": {
    "Product": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "name", "type": "string" }
      ]
    },
    "PurchaseHistory": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "product_id", "type": "uuid", "foreign_key": "Product.id" },
        { "name": "vendor_name", "type": "string" },
        { "name": "price", "type": "decimal" },
        { "name": "purchase_date", "type": "datetime" }
      ]
    }
  }
}
-->