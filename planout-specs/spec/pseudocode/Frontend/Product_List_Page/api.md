/**
 * API Contract Implementation
 */
export const fetchProducts = async (params) => {
  // Maps to GET /products
  const query = new URLSearchParams({
    page: params.page,
    limit: params.limit,
    search: params.search,
    brandName: params.brandName
  }).toString();

  const response = await fetch(`/products?${query}`, { method: 'GET' });
  return response.json();
};