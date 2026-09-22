/**
 * API Service for Stock Orders
 */
export const fetchStockOrders = async (params) => {
  // Mapping request body fields as per API PAYLOADS
  const payload = {
    stock_type: params.stock_type,
    limit: params.limit,
    offset: params.offset
  };

  const response = await fetch('/api/stock-orders', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};