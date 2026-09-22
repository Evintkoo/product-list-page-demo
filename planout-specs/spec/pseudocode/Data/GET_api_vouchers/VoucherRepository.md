/**
 * Data access layer for Voucher entities.
 * Handles filtering, searching, and pagination logic.
 */
function getVouchers(filters: {
  voucher_type?: string,
  sku?: string,
  name?: string,
  status?: string,
  search?: string,
  limit?: number,
  offset?: number
}) {
  // Initialize base query
  let query = DB.table("Voucher").select("*");

  // Apply optional filters
  if (filters.voucher_type) {
    query = query.where("voucher_type", "=", filters.voucher_type);
  }

  if (filters.sku) {
    query = query.where("sku", "=", filters.sku);
  }

  if (filters.name) {
    query = query.where("name", "ILIKE", `%${filters.name}%`);
  }

  if (filters.status) {
    query = query.where("status", "=", filters.status);
  }

  // Apply search across SKU and Name
  if (filters.search) {
    query = query.where(q => 
      q.where("sku", "ILIKE", `%${filters.search}%`)
       .orWhere("name", "ILIKE", `%${filters.search}%`)
    );
  }

  // Apply pagination
  const limit = filters.limit ?? 20;
  const offset = filters.offset ?? 0;

  return query
    .limit(limit)
    .offset(offset)
    .orderBy("created_at", "DESC")
    .execute();
}