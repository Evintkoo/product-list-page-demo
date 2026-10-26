### Node: HTTP 400 Bad Request JSON Schema (26097b45-e5c7-4591-a917-c029127f925d)

**Inputs:**
*   Received from: "HTTP Common Status Codes Overview" (Data) via connection "400 Bad Request".

**Outputs:**
*   None (Terminal node).

**Logic:**
This node defines the structural contract for a 400 Bad Request response. The system must return a JSON object adhering to the following schema:
1.  `status`: Must be a constant integer value of `400`.
2.  `error`: A mandatory string providing a human-readable explanation of the request failure.
3.  `details`: An optional array of strings containing specific validation or parsing error messages.

**States:**
*   **Happy Path:** The API returns a JSON object with `status: 400`, a descriptive `error` string, and an optional `details` array populated with specific field-level validation errors.
*   **Validation/Error:** If the response object is missing the `status` or `error` fields, the response is considered malformed according to this schema.
*   **Empty State:** If no specific validation details are available, the `details` field may be omitted or returned as an empty array.

**Side Effects:**
*   None. This is a schema definition used for API documentation and response validation.

**Notes covered:**
*   "This schema defines the HTTP 400 Bad Request response returned when the client sends an invalid or malformed request."
*   "status": { "const": 400, "description": "The HTTP status code, always 400 for a bad request." }
*   "error": { "type": "string", "description": "A human-readable message describing why the request was invalid." }
*   "details": { "type": "array", "items": { "type": "string" }, "description": "A list of specific validation or parsing errors." }
*   "required": ["status", "error"]
*   "description": "Represents an error response returned when the client sends an invalid or malformed request."