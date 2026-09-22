/**
 * API Contract: POST /api/products
 */
export const postProduct = async (payload) => {
  const response = await fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  
  if (!response.ok) throw new Error('Failed to create product');
  return response.json();
};