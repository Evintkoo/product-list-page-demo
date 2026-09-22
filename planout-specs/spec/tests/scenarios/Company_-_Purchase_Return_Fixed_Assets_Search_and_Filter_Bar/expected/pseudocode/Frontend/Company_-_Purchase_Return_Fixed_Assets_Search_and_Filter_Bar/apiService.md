/**
 * API Service for Purchase Returns
 * Logic for executing the search request.
 */

export const fetchPurchaseReturns = async (params) => {
  // Construct query string from params
  const query = new URLSearchParams(params).toString();
  
  // Endpoint: GET /api/purchase-returns
  const response = await fetch(`/api/purchase-returns?${query}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch purchase returns');
  }

  return response.json();
};