/**
 * Data definition for Service Product Types within the Lumi ERP system.
 * This schema ensures consistency between the database layer and the 
 * application logic for service-based product categorization.
 */

const ServiceProductTypeSchema = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    name: { type: "string" },
    description: { type: "string" },
    service_advisor: { 
      type: "string", 
      format: "uuid",
      description: "Foreign key referencing coas.id for accounting journal mapping"
    },
    refund_account: { 
      type: "string", 
      format: "uuid",
      description: "Foreign key referencing coas.id for PPh 23 refund mapping"
    },
    active: { type: "boolean", default: true }
  },
  required: ["id", "name", "service_advisor", "active"]
};