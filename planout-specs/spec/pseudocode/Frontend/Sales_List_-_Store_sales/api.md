// API consistency layer
export const fetchSales = async (params) => {
  // Maps to GET /api/sales
  // Query params: limit, offset, store_id, salesperson_id
  const response = await apiClient.get('/api/sales', { params });
  return response.data;
};