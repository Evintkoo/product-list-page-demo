export const fetchSalesOrders = async (params) => {
  // Maps to GET /api/sales-orders
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/sales-orders?${queryString}`);
  return response.json();
};