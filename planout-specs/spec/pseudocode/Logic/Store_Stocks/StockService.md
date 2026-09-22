/**
 * Fetches stock levels for a specific product with optional filtering and pagination.
 */
async function getProductStocks(productId, filters = {}) {
  // filters: { store_id, name, store_code, show_stock, page }
  const response = await fetch(`/api/products/${productId}/stocks?${new URLSearchParams(filters)}`);
  return await response.json();
}

/**
 * Fetches the list of all stores for filter population.
 */
async function getStores() {
  const response = await fetch('/api/stores');
  return await response.json();
}

/**
 * Updates min/max quantities for multiple stock records.
 */
async function updateStockLevels(productId, items) {
  // items: Array of { stock_id, min_qty, max_qty }
  const response = await fetch(`/api/products/${productId}/stocks`, {
    method: 'PATCH',
    body: JSON.stringify({ items })
  });
  return await response.json();
}