/**
 * API Logic for Product List Page
 */
export const fetchProducts = async (params) => {
  // Maps to GET /products
  // Query params: page, limit, search, brandName
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/products?${queryString}`, {
    method: 'GET',
  });
  
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};