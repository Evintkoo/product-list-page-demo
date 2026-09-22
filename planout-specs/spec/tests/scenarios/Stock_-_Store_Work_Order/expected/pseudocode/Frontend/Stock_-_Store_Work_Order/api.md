/**
 * API Layer
 * Logic: GET /api/stock-orders
 */
export const fetchStockOrders = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/stock-orders?${queryString}`);
  if (!response.ok) throw new Error('Failed to fetch stock orders');
  return response.json();
};