/**
 * Handles the initialization of the Store Stocks view.
 */
async function initializeView(productId) {
  const [stocks, stores] = await Promise.all([
    getProductStocks(productId, { page: 1 }),
    getStores()
  ]);
  
  renderTable(stocks);
  populateStoreFilters(stores);
}

/**
 * Handles pagination and filter-based reloads.
 */
async function reloadTable(productId, currentFilters) {
  const data = await getProductStocks(productId, currentFilters);
  renderTable(data);
}

/**
 * Validates and persists changes to min/max quantities.
 */
async function handleSave(productId, changedRows) {
  // Validation: Ensure min_qty <= max_qty for all rows
  for (const row of changedRows) {
    if (row.min_qty > row.max_qty) {
      throw new Error(`Validation Error: Min Qty cannot exceed Max Qty for ${row.store_name}`);
    }
  }

  const updatedData = await updateStockLevels(productId, changedRows);
  renderTable(updatedData);
  setReadOnlyMode(true);
}

/**
 * Maps raw API response to UI columns.
 */
function renderTable(data) {
  const tableData = data.map(item => ({
    code: item.store_code, <!-- MISSING_FIELD: Stock.store_code -->
    store: item.store_name, <!-- MISSING_FIELD: Store.name -->
    qty: item.quantity,
    reserved: item.reserved, <!-- MISSING_FIELD: Stock.reserved -->
    inTransit: item.in_transit, <!-- MISSING_FIELD: Stock.in_transit -->
    minQty: item.min_qty, <!-- MISSING_FIELD: Stock.min_qty -->
    maxQty: item.max_qty, <!-- MISSING_FIELD: Stock.max_qty -->
    avgCost: item.average_cost, <!-- MISSING_FIELD: Stock.average_cost -->
    totalCost: item.total_cost <!-- MISSING_FIELD: Stock.total_cost -->
  }));
  
  updateUI(tableData, data.total_qty, data.pages, data.page);
}