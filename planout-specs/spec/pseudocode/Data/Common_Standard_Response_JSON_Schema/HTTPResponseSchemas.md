// Unit: HTTP Common Status Codes Overview (e01cda29-6f96-4dab-9b70-1643fd95a1ac)
// Logic: Defines the standard HTTP status code registry for the API.
// Inputs: None.
// Outputs: Triggers specific schema definitions for 201, 400, 401, 403, 404, 409, 422, 429, 500, 503.
// Notes covered: RFC 7231 compliance, 1xx-5xx ranges, specific codes (201, 400, 401, 403, 404, 409, 500, 503, 429, 422).

// Unit: HTTP 409 Conflict JSON Schema (6d8ea82c-baf2-4646-bafd-ec5921778520)
// Logic: Schema for resource state conflicts.
// Interface: { status: 409, error: "Conflict", message: string, details?: object }
// Notes covered: status 409, error "Conflict", message, details object.

// Unit: HTTP 201 Created JSON Schema (8cf30d71-d49d-4b5d-ac1f-87d731168b8d)
// Logic: Schema for successful resource creation.
// Interface: { status: 201, data: object, location: uri }
// Notes covered: status 201, data object, location URI.

// Unit: HTTP 422 Unprocessable Entity JSON Schema (d3cac073-7665-4627-8532-d0c94df268fa)
// Logic: Schema for semantic validation failures.
// Interface: { status: 422, error: string, message: string, errors: [{ field: string, issue: string }] }
// Notes covered: status 422, error, message, errors array (field, issue).

// Unit: HTTP 503 Service Unavailable JSON Schema (8cf739f4-ac64-423b-94d9-56d96c66f0bd)
// Logic: Schema for temporary server unavailability.
// Interface: { status: 503, error: string }
// Notes covered: status 503, error message.

// Unit: HTTP 429 Too Many Requests JSON Schema (aee794c0-c5d6-4437-8e18-7ff4a91edb9b)
// Logic: Schema for rate-limited requests.
// Interface: { status: 429, error: string, retryAfter: integer }
// Notes covered: status 429, error message, retryAfter seconds.

// Unit: HTTP 403 Forbidden JSON Schema (e2d2716d-644d-4579-9787-66b0682f81da)
// Logic: Schema for authenticated but unauthorized access.
// Interface: { status: 403, error: string }
// Notes covered: status 403, error message.

// Unit: HTTP 400 Bad Request JSON Schema (26097b45-e5c7-4591-a917-c029127f925d)
// Logic: Schema for malformed client requests.
// Interface: { status: 400, error: string, details?: string[] }
// Notes covered: status 400, error message, details array of strings.

<!-- SCHEMA
{
  "entities": {
    "HTTP401Response": {
      "fields": [
        { "name": "status", "type": "integer" },
        { "name": "error", "type": "string" }
      ]
    },
    "HTTP500Response": {
      "fields": [
        { "name": "status", "type": "integer" },
        { "name": "error", "type": "string" }
      ]
    },
    "HTTP404Response": {
      "fields": [
        { "name": "status", "type": "integer" },
        { "name": "error", "type": "string" }
      ]
    }
  }
}
-->