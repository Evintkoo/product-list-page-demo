export const fetchPurchaseOrders = async (params) => {
  // Endpoint: GET /purchase-orders
  // Logic: Filters are applied via query parameters based on the request body schema
  return await apiClient.get('/purchase-orders', { params });
};