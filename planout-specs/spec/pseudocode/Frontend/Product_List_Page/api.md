/**
 * API Service for Product operations
 */
export const fetchProducts = async (params: { 
  status?: string, 
  search?: string, 
  page?: number, 
  limit?: number 
}) => {
  // Construct query string from params
  const query = new URLSearchParams(params as any).toString();
  
  const response = await fetch(`/products?${query}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) throw new Error('Failed to fetch products');
  
  return response.json();
};