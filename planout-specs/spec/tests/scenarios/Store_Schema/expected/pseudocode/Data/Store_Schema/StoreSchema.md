/**
 * JSON Schema definition for the Store entity.
 * Used for validation of incoming data and API contract enforcement.
 */
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Store",
  "type": "object",
  "properties": {
    "store_id": { "type": "string", "format": "uuid" },
    "store_name": { "type": "string" },
    "store_code": { "type": "string" }
  },
  "required": ["store_id", "store_name", "store_code"]
}