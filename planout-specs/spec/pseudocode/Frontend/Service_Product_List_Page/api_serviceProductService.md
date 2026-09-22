/**
 * API Contract: GET /service_products
 * Fetches the list of service products based on search and status filters.
 */
export const fetchServiceProducts = async ({ search, status }) => {
  const queryParams = new URLSearchParams({ search, status }).toString();
  const response = await fetch(`/service_products?${queryParams}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};