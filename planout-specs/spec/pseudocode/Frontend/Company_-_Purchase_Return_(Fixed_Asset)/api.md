/**
 * API consistency layer
 */
export const fetchPurchaseReturns = async (params) => {
  // Maps to GET /api/purchase-returns
  const response = await fetch('/api/purchase-returns', {
    method: 'GET',
    // Query params derived from filter state
  });
  return response.json();
};