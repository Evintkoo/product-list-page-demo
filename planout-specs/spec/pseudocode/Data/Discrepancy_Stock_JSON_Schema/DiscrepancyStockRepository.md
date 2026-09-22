/**
 * Retrieves a paginated list of discrepancy stocks for the Store tab.
 * Joins header, items, products, store, and user info.
 */
function getDiscrepancyStockList(filters: {
  company_id: UUID,
  created_from?: Date,
  created_to?: Date,
  sku_prefix?: string,
  product_name?: string,
  ref_code_prefix?: string,
  entity_id?: number,
  status?: string[],
  limit: number,
  offset: number
}) {
  // Executes the SQL query defined in the Discrepancy Stock List Query node.
  // Returns an array of rows where each row contains the full header and item details.
  // The total_count is extracted from the window function to populate the pagination block.
  return db.query(SQL_DISCREPANCY_STOCK_LIST, [
    filters.company_id,
    filters.created_from,
    filters.created_to,
    filters.sku_prefix,
    filters.product_name,
    filters.ref_code_prefix,
    filters.entity_id,
    filters.status,
    filters.limit,
    filters.offset
  ]);
}

/**
 * Persists a new discrepancy stock report.
 * Uses the Discrepancy Stock Create Request schema for validation.
 */
function createDiscrepancyStock(data: {
  company_id: UUID,
  creator_id: UUID,
  entity_id: number,
  reference?: string,
  items: Array<{
    product_id: number,
    quantity: number,
    notes?: string
  }>
}) {
  // 1. Start Transaction
  // 2. Insert into discrepancy_stock (entity_type = 'store', aasm_state = 'draft')
  // 3. Insert into discrepancy_stock_item for each item in the array
  // 4. Commit Transaction
  // 5. Return the created record using the Discrepancy Stock Detail Response shape
}