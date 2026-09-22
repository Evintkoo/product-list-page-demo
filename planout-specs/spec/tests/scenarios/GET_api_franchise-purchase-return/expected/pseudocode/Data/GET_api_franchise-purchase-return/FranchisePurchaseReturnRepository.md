/**
 * Data access layer for FranchisePurchaseReturn entities.
 * Handles filtering, pagination, and retrieval from the database.
 */

function findPurchaseReturnsByFranchise(
  franchiseId: string,
  filters: {
    startDate?: string,
    endDate?: string,
    page: number,
    limit: number
  }
) {
  // Calculate offset for pagination
  const offset = (filters.page - 1) * filters.limit;

  // Build query base
  let query = db.table("FranchisePurchaseReturn")
    .where("franchise_id", "=", franchiseId);

  // Apply date range filters if provided
  if (filters.startDate) {
    query = query.where("return_date", ">=", filters.startDate);
  }
  if (filters.endDate) {
    query = query.where("return_date", "<=", filters.endDate);
  }

  // Execute query with pagination
  return query
    .orderBy("return_date", "DESC")
    .limit(filters.limit)
    .offset(offset)
    .execute();
}

/**
 * Verifies if a franchise exists in the system.
 * Used to distinguish between "No records found" and "Franchise not found".
 */
function existsFranchise(franchiseId: string): boolean {
  const record = db.table("Franchise")
    .where("id", "=", franchiseId)
    .first();
    
  return record !== null;
}