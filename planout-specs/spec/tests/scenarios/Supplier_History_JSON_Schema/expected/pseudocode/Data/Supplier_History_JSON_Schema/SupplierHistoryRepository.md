/**
 * Fetches a paginated list of supplier history records.
 * 
 * @param supplier_id - The UUID of the supplier to fetch history for.
 * @param limit - Number of records to return.
 * @param offset - Number of records to skip.
 * @returns A promise containing the history array and metadata (total records/pages).
 */
async function getSupplierHistory(supplier_id: uuid, limit: integer, offset: integer) {
  // 1. Execute the main data query
  const history = await db.query(`
    SELECT 
      history_id, updated_at, updated_by, name, address, phone, fax, 
      email, contact_name, registration_no, tax_no, credit_term_days, credit_limit
    FROM supplier_history
    WHERE supplier_id = $1
    ORDER BY updated_at DESC
    LIMIT $2 OFFSET $3
  `, [supplier_id, limit, offset]);

  // 2. Execute count query for pagination metadata
  const countResult = await db.query(`
    SELECT COUNT(*) as total 
    FROM supplier_history 
    WHERE supplier_id = $1
  `, [supplier_id]);

  const totalRecords = parseInt(countResult[0].total);
  const totalPages = Math.ceil(totalRecords / limit);

  // 3. Return structured response matching SupplierHistoryListResponse schema
  return {
    records: totalRecords,
    pages: totalPages,
    page: Math.floor(offset / limit) + 1,
    history: history
  };
}