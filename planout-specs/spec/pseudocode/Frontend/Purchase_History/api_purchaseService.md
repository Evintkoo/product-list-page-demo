/**
 * API Service for Purchase History
 */
export const fetchPurchases = async (id: string) => {
  // Maps to GET /products/:id/purchases
  const response = await fetch(`/products/${id}/purchases`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};