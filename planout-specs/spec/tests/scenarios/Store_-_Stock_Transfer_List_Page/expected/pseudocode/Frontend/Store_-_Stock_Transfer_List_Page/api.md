/**
 * API CONTRACTS:
 * GET /api/stock-transfers
 */
export const fetchStockTransfers = async (params) => {
  const response = await fetch(`/api/stock-transfers?${new URLSearchParams(params)}`);
  return response.json();
};