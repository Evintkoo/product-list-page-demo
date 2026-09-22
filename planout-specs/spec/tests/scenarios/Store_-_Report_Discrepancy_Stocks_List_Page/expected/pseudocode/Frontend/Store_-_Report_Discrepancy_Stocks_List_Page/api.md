export const fetchDiscrepancyStocks = async (params) => {
  // Maps to GET /api/discrepancy-stocks
  // Payload fields: limit, offset, sku, product_name, status
  const response = await fetch('/api/discrepancy-stocks', {
    method: 'GET',
    body: JSON.stringify(params)
  });
  return response.json();
};