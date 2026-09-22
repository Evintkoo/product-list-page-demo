/**
 * API Contract Implementation
 */
export const fetchFranchisePurchaseOrders = async (params) => {
  // Maps to GET /api/franchise-purchase-orders
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`/api/franchise-purchase-orders?${query}`);
  return response.json();
};