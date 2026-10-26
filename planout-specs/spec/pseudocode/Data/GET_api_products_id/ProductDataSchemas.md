/**
 * Node: 401 Unauthorized JSON Schema (id: 9b4f2562-0652-4f40-b2e4-b7c0c12fc9c4)
 * Input: Triggered by Logic lane "401 Unauthorized" branch.
 * Output: Returns standard UnauthorizedError object to Logic lane.
 */
export const UnauthorizedErrorSchema = {
  type: "object",
  properties: {
    error: { type: "string" },
    message: { type: "string" }
  },
  required: ["error", "message"]
};
// Notes covered: JSON schema definition for UnauthorizedError, required fields error and message.

/**
 * Node: 500 Internal Server Error JSON schema (id: 74b173ba-ae7b-4852-9ded-dba20169abf5)
 * Input: Triggered by Logic lane "500 Internal Server Error" branch.
 * Output: Returns standard InternalServerError object to Logic lane.
 */
export const InternalServerErrorSchema = {
  type: "object",
  properties: {
    error: { type: "string" },
    message: { type: "string" }
  },
  required: ["error", "message"]
};
// Notes covered: JSON schema definition for InternalServerError, required fields error and message.

/**
 * Node: (Unnamed) (id: 41c14a50-098b-4387-b69c-ef16d7081008)
 * Input: Triggered by Logic lane "product details JSON Schema" branch.
 * Output: Returns Product entity schema to Logic lane.
 */
export const ProductSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
    sku: { type: "string" },
    price: { type: "number" },
    created_at: { type: "string", format: "date-time" }
  },
  required: ["id", "name", "sku", "price", "created_at"]
};
// Notes covered: Product entity structure based on schema definition.

/**
 * Node: 404 Not Found JSON Schema (id: 25ffe387-4d50-461b-ac20-8308031b793a)
 * Input: Triggered by Logic lane "404 Not Found" branch.
 * Output: Returns NotFoundError object to Logic lane.
 */
export const NotFoundErrorSchema = {
  type: "object",
  properties: {
    error: { type: "string" },
    message: { type: "string" },
    resource: { type: "string" }
  },
  required: ["error", "message"]
};
// Notes covered: JSON schema definition for NotFoundError, required fields error and message, optional field resource.