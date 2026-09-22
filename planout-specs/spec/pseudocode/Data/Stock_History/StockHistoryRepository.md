/**
 * Fetches a list of stores for the filter dropdown.
 * Returns: Array<{ id: uuid, store_name: string }>
 */
function getStores() {
  return db.query("SELECT id, store_name FROM Store");
}

/**
 * Fetches stock history records based on product and optional filters.
 * @param {uuid} productId - The product to filter by.
 * @param {Object} filters - Optional filters (storeId, type, fromDate, toDate, createdBy).
 * @param {Object} sort - Sorting criteria (column, direction).
 */
function getStockHistories(productId, filters, sort) {
  let query = `
    SELECT 
      sh.id, 
      sh.created_at, 
      s.store_name, 
      sh.type, 
      sh.increasedQty, 
      sh.decreasedQty, 
      sh.totalQtyChanged, 
      sh.notes, 
      sh.createdBy 
    FROM StockHistory sh
    JOIN Store s ON sh.store_id = s.id
    WHERE sh.product_id = :productId
  `;

  // Apply dynamic filters
  if (filters.storeId) query += " AND sh.store_id = :storeId";
  if (filters.type) query += " AND sh.type = :type";
  if (filters.fromDate) query += " AND sh.created_at >= :fromDate";
  if (filters.toDate) query += " AND sh.created_at <= :toDate";
  if (filters.createdBy) query += " AND sh.createdBy = :createdBy";

  // Apply sorting
  if (sort.column) {
    query += ` ORDER BY ${sort.column} ${sort.direction}`;
  } else {
    query += " ORDER BY sh.created_at DESC";
  }

  return db.execute(query, { productId, ...filters });
}