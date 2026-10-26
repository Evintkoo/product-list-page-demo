/**
 * Nodes: 3, 4, 5, 6, 7, 8, 9 (24c6cbde-67eb-44ac-8f89-058c0a5f5be7, etc.)
 * Maps database or validation exceptions to HTTP status codes.
 */

// 422 Unprocessable Entity: Triggered when filter values fail type validation.
// 403 Forbidden: Triggered when user lacks permission to list products.
// 429 Too Many Requests: Triggered when rate limit is exceeded.
// 401 Unauthorized: Triggered when authentication is missing or invalid.
// 500 Internal Server Error: Triggered on unexpected database/server failure.
// 400 Bad Request: Triggered when query parameters are malformed.
// 404 Not Found: Triggered when referenced filter IDs (brand, type, tax, tag) do not exist.

// Notes covered:
// - 200 OK: products returned
// - 400 Bad Request: malformed parameters
// - 401 Unauthorized: missing/invalid auth
// - 403 Forbidden: insufficient permissions
// - 404 Not Found: referenced filter id missing
// - 422 Unprocessable Entity: validation failure
// - 429 Too Many Requests: rate limit exceeded
// - 500 Internal Server Error: unexpected failure

<!-- SCHEMA
{
  "entities": {
    "Product": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true },
        { "name": "sku", "type": "string" },
        { "name": "name", "type": "string" },
        { "name": "product_code", "type": "string" },
        { "name": "product_brand_id", "type": "uuid", "foreign_key": "Brand.id" },
        { "name": "product_type_id", "type": "uuid", "foreign_key": "ProductType.id" },
        { "name": "tax_id", "type": "uuid", "foreign_key": "Tax.id" },
        { "name": "info_1", "type": "string" },
        { "name": "info_2", "type": "string" },
        { "name": "info_3", "type": "string" }
      ]
    },
    "Brand": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true }
      ]
    },
    "ProductType": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true }
      ]
    },
    "Tax": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true }
      ]
    },
    "Tag": {
      "fields": [
        { "name": "id", "type": "uuid", "primary": true }
      ]
    }
  }
}
-->