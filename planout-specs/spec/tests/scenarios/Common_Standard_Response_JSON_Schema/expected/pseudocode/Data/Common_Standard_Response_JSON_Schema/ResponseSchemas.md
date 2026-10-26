// Unit: HTTP Common Status Codes Overview (e01cda29-6f96-4dab-9b70-1643fd95a1ac)
// This node acts as the registry for standard HTTP status codes (1xx-5xx) per RFC 7231.
// It routes to specific schema definitions based on the status code.
// Happy path: Directs to the appropriate schema definition.
// Error/Empty: N/A (Registry node).
// Side effects: None.
// Notes covered: 1xx through 5xx ranges, RFC 7231, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Internal Server Error, 503 Service Unavailable, 429 Too Many Requests, 422 Unprocessable Entity.

// Unit: HTTP 409 Conflict JSON Schema (6d8ea82c-baf2-4646-bafd-ec5921778520)
// Receives: Trigger from Overview node.
// Schema: { status: 409 (const), error: "Conflict" (const), message: string, details: object }.
// Required: status, error, message.
// Notes covered: HTTP 409 Conflict response, request conflicts with current state, schema definition.

// Unit: HTTP 201 Created JSON Schema (8cf30d71-d49d-4b5d-ac1f-87d731168b8d)
// Receives: Trigger from Overview node.
// Schema: { status: 201 (const), data: object, location: uri }.
// Required: status, data.
// Notes covered: HTTP 201 Created response, resource successfully created, status 201, data representation, location URI.

// Unit: HTTP 422 Unprocessable Entity JSON Schema (d3cac073-7665-4627-8532-d0c94df268fa)
// Receives: Trigger from Overview node.
// Schema: { status: 422 (const), error: string, message: string, errors: array[{field: string, issue: string}] }.
// Required: status, error, message.
// Notes covered: HTTP 422 Unprocessable Entity response, well-formed but semantic validation errors, schema definition.

// Unit: HTTP 503 Service Unavailable JSON Schema (8cf739f4-ac64-423b-94d9-56d96c66f0bd)
// Receives: Trigger from Overview node.
// Schema: { status: 503 (const), error: string }.
// Required: status, error.
// Notes covered: HTTP 503 Service Unavailable response, server temporarily unable to handle request, schema definition.

// Unit: HTTP 429 Too Many Requests JSON Schema (aee794c0-c5d6-4437-8e18-7ff4a91edb9b)
// Receives: Trigger from Overview node.
// Schema: { status: 429 (const), error: string, retryAfter: integer }.
// Required: status, error.
// Notes covered: HTTP 429 Too Many Requests response, client exceeded request rate, retryAfter seconds.

// Unit: HTTP 403 Forbidden JSON Schema (e2d2716d-644d-4579-9787-66b0682f81da)
// Receives: Trigger from Overview node.
// Schema: { status: 403 (const), error: string }.
// Required: status, error.
// Notes covered: HTTP 403 Forbidden response, authenticated but not permitted, schema definition.

// Unit: HTTP 400 Bad Request JSON Schema (26097b45-e5c7-4591-a917-c029127f825d)
// Receives: Trigger from Overview node.
// Schema: { status: 400 (const), error: string, details: array[string] }.
// Required: status, error.
// Notes covered: HTTP 400 Bad Request response, invalid or malformed request, schema definition.

// Unit: HTTP 401 Unauthorized JSON Schema (29d99fa9-64a1-4e40-9ed0-084810b2feb8)
// Receives: Trigger from Overview node.
// Schema: { status: 401 (const), error: string }.
// Required: status, error.
// Notes covered: HTTP 401 Unauthorized response, authentication missing or invalid, schema definition.

// Unit: HTTP 500 Internal Server Error JSON Schema (da7e2be5-f396-486d-b86d-c7e851caa7d6)
// Receives: Trigger from Overview node.
// Schema: { status: 500 (const), error: string }.
// Required: status, error.
// Notes covered: HTTP 500 Internal Server Error response, unexpected internal error, schema definition.

// Unit: HTTP 404 Not Found JSON Schema (3ef3dfa9-886f-4876-bd1b-253999cda892)
// Receives: Trigger from Overview node.
// Schema: { status: 404 (const), error: string }.
// Required: status, error.
// Notes covered: HTTP 404 Not Found response, requested resource cannot be located, schema definition.

<!-- SCHEMA
{
  "entities": {
    "HTTP400Response": {
      "fields": [
        { "name": "status", "type": "integer" },
        { "name": "error", "type": "string" },
        { "name": "details", "type": "array", "nullable": true }
      ]
    }
  }
}
-->