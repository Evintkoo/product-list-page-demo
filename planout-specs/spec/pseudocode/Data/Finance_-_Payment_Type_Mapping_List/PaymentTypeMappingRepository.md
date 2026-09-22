/**
 * Data Access Layer for Payment Type Mappings.
 * Handles the persistence and retrieval of mapping rules defined in TURBOLYMIG-399.
 */

// Define the interface for the mapping record based on the schema
interface PaymentTypeMappingRecord {
  id: UUID;
  store: string;
  payment_type: string;
  active: boolean;
  created_at: DateTime;
  updated_at: DateTime;
}

// Fetch all payment type mappings for the UI list view
function getAllMappings(): List<PaymentTypeMappingRecord> {
  return DB.query("SELECT * FROM PaymentTypeMapping ORDER BY store ASC, payment_type ASC");
}

// Update an existing mapping status or details
function updateMapping(id: UUID, data: Partial<PaymentTypeMappingRecord>): PaymentTypeMappingRecord {
  return DB.update("PaymentTypeMapping")
    .where("id", id)
    .set({
      ...data,
      updated_at: CurrentDateTime()
    })
    .execute();
}

// Map incoming JSON payload to internal schema fields
function transformJsonToEntity(jsonPayload: Object): PaymentTypeMappingRecord {
  return {
    store: jsonPayload.store_name,
    payment_type: jsonPayload.payment_type_name,
    active: jsonPayload.is_active
  };
}