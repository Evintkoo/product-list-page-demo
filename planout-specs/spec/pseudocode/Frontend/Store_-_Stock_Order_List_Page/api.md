export const fetchStockOrders = async (params) => {
  // Construct query string from params
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/stock-orders?${queryString}`);
  return response.json();
};

export const checkAuth = async () => {
  const response = await fetch('/api/auth/me');
  if (!response.ok) throw new Error('Unauthorized');
  return response.json();
};