/**
 * Node: HTTP 401 Unauthorized JSON Schema (29d99fa9-64a1-4e40-9ed0-084810b2feb8)
 * Input: Triggered by "401 Unauthorized" from HTTP Common Status Codes Overview.
 * Output: Returns JSON object to client.
 */
export const HTTP401Response = {
  status: 401, // Const
  error: "string" // Message: authentication missing or invalid
};
// Notes covered: Schema definition, status const 401, error message field, required fields status/error.

/**
 * Node: HTTP 500 Internal Server Error JSON Schema (da7e2be5-f396-486d-b86d-c7e851caa7d6)
 * Input: Triggered by "500 Internal Server Error" from HTTP Common Status Codes Overview.
 * Output: Returns JSON object to client.
 */
export const HTTP500Response = {
  status: 500, // Const
  error: "string" // Message: unexpected server error
};
// Notes covered: Schema definition, status const 500, error message field, required fields status/error.

/**
 * Node: HTTP 404 Not Found JSON Schema (3ef3dfa9-886f-4876-bd1b-253999cda892)
 * Input: Triggered by "404 Not Found" from HTTP Common Status Codes Overview.
 * Output: Returns JSON object to client.
 */
export const HTTP404Response = {
  status: 404, // Const
  error: "string" // Message: resource could not be located
};
// Notes covered: Schema definition, status const 404, error message field, required fields status/error.