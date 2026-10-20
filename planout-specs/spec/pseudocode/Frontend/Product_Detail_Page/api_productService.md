/**
 * API Contract: GET /api/products/:id
 */
export const fetchProductDetails = async (id: string) => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};