/**
 * Validation schema for incoming POST /api/service_product_types requests.
 */
const ServiceProductTypeSchema = {
  type: "object",
  required: ["name"],
  properties: {
    name: { type: "string", minLength: 1 },
    description: { type: "string" },
    service_advisor_id: { type: "string", format: "uuid" },
    refund_account_id: { type: "string", format: "uuid" },
    is_active: { type: "boolean" }
  }
};