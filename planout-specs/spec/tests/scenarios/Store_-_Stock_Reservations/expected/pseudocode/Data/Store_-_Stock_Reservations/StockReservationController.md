/**
 * API Controller mapping HTTP requests to Repository methods.
 */

// GET /api/stock-reservations
// Query Params: from_date, to_date, product_sku, product_name, store_id
function handleGetStockReservations(req, res) {
  const data = getStockReservations(req.query);
  res.status(200).json(data);
}

// GET /api/stores
function handleGetStores(req, res) {
  const stores = getAllStores();
  res.status(200).json(stores);
}