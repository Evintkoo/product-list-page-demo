/**
 * Fetches a paginated list of discrepancy stocks based on user-provided filters.
 * Scoped strictly to the authenticated user's company and 'store' entity_type.
 */
function findDiscrepancyStocks(
  companyId: UUID,
  filters: {
    from_date?: Date,
    to_date?: Date,
    sku?: string,
    product_name?: string,
    document_ref_code?: string,
    entity_id?: integer,
    status?: string[],
    limit: integer,
    offset: integer
  }
) {
  // 1. Initialize base query
  // Scope to company and entity_type = 'store'
  let query = DB.table("DiscrepancyStock")
    .where("company_id", "=", companyId)
    .where("entity_type", "=", "store");

  // 2. Apply dynamic filters
  if (filters.from_date) query = query.where("report_date", ">=", filters.from_date);
  if (filters.to_date) query = query.where("report_date", "<=", filters.to_date);
  if (filters.sku) query = query.where("sku", "LIKE", `${filters.sku}%`);
  if (filters.product_name) query = query.where("product_name", "LIKE", `%${filters.product_name}%`);
  if (filters.document_ref_code) query = query.where("document_ref_code", "LIKE", `${filters.document_ref_code}%`);
  if (filters.entity_id) query = query.where("entity_id", "=", filters.entity_id);
  if (filters.status && filters.status.length > 0) query = query.whereIn("status", filters.status);

  // 3. Apply pagination and ordering
  return query
    .orderBy("created_at", "DESC")
    .limit(filters.limit)
    .offset(filters.offset)
    .execute();
}