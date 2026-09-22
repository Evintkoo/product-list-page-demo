/**
 * API Endpoint: GET /api/stores
 * Returns the list of stores for the UI dropdown.
 */
function handleGetStores(req, res) {
  const stores = getStores();
  res.json(stores.map(s => ({ id: s.id, store_name: s.store_name })));
}

/**
 * API Endpoint: GET /api/store-stock-histories
 * Query Params: productId, storeId, type, fromDate, toDate, createdBy, sortBy, sortOrder
 */
function handleGetStockHistories(req, res) {
  const { productId, storeId, type, fromDate, toDate, createdBy, sortBy, sortOrder } = req.query;
  
  const data = getStockHistories(
    productId, 
    { storeId, type, fromDate, toDate, createdBy },
    { column: sortBy, direction: sortOrder }
  );

  res.json(data.map(record => ({
    id: record.id,
    created_at: record.created_at,
    store_name: record.store_name,
    type: record.type,
    increasedQty: record.increasedQty,
    decreasedQty: record.decreasedQty,
    totalQtyChanged: record.totalQtyChanged,
    notes: record.notes,
    createdBy: record.createdBy
  })));
}