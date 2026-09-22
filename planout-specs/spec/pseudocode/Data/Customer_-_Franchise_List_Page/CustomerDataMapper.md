/**
 * Maps raw database entities to the shape expected by the API/Frontend.
 * Ensures consistent naming conventions across the Lumi ERP platform.
 */

function mapToFranchiseDTO(customerRecord) {
  return {
    id: customerRecord.id,
    franchiseName: customerRecord.name,
    status: customerRecord.status,
    parentOrganization: customerRecord.parent_customer?.name || null,
    registeredDate: customerRecord.created_at
  };
}