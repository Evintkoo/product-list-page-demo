/**
 * API Service for Product History
 */
export const fetchProductHistory = async (productId: string) => {
  // Endpoint: GET /api/products/:id/history
  const response = await fetch(`/api/products/${productId}/history`);
  if (!response.ok) throw new Error('Failed to fetch history');
  return response.json();
};