/**
 * Handles data retrieval for Stock Opname requests.
 * Maps API query parameters to database filters for the StockOrder entity.
 */
function getStockOpnameList(params) {
  // 1. Initialize base query
  // Enforce mandatory filter: source_type must be 'stock_order' (mapped from stock_type=warehouse)
  let query = Database.table("StockOrder").where("source_type", "=", "stock_order");

  // 2. Apply optional filters
  if (params.ref_code) {
    // Partial match on ref_code OR supplier_ref_code
    query = query.where(builder => 
      builder.where("ref_code", "LIKE", `%${params.ref_code}%`)
             .orWhere("supplier_ref_code", "LIKE", `%${params.ref_code}%`)
    );
  }

  if (params.from_date) {
    // Inclusive start date
    query = query.where("created_at", ">=", params.from_date);
  }

  if (params.to_date) {
    // Inclusive end date
    query = query.where("created_at", "<=", params.to_date);
  }

  if (params.store_id) {
    query = query.where("to_store_id", "=", params.store_id);
  }

  if (params.status) {
    query = query.where("workflow_state", "=", params.status);
  }

  // 3. Execute and return results
  try {
    return query.fetchAll();
  } catch (error) {
    throw new Error("DATABASE_LOOKUP_FAILED");
  }
}