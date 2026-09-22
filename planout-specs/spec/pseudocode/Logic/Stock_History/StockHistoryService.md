/**
 * Fetches the list of stores to populate the filter dropdown.
 */
async function getStores() {
  const response = await fetch("/api/stores");
  const data = await response.json();
  
  // Map to dropdown format
  return data.map(store => ({
    id: store.id,
    value: store.store_name
  }));
}

/**
 * Fetches stock history for a specific product, applying optional filters.
 * @param filters Object containing store_id, type, from_date, to_date, created_by
 */
async function getStockHistory(productId: string, filters: object) {
  const queryParams = new URLSearchParams({ product_id: productId, ...filters });
  const response = await fetch(`/api/store-stock-histories?${queryParams.toString()}`);
  return await response.json();
}