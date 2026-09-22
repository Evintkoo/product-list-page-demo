/**
 * Data access layer for ServiceProductType entities.
 * Handles persistence and retrieval of service types used in the ERP.
 */

function createServiceProductType(data: Partial<ServiceProductType>) {
  // Logic to insert into ServiceProductType table
  // Ensure 'active' defaults to true if not provided
}

function getActiveServiceProductTypes() {
  // Query ServiceProductType where active = true
  // Join with coas table to resolve account names for UI display
}

function updateServiceProductType(id: string, updates: Partial<ServiceProductType>) {
  // Logic to update existing record in ServiceProductType table
}