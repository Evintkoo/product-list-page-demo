export const fetchStockReturns = async (params) => {
  // Maps to GET /api/stock-returns
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`/api/stock-returns?${query}`);
  return response.json();
};

export const fetchStores = async () => {
  // Maps to GET /api/stores
  const response = await fetch('/api/stores');
  return response.json();
};

export const fetchWarehouses = async () => {
  // Maps to GET /api/warehouses
  const response = await fetch('/api/warehouses');
  return response.json();
};