/**
 * API Service for Customer operations
 */
export const fetchCustomerDetail = async (id: string) => {
  // Maps to GET /api/customers/:id
  const response = await fetch(`/api/customers/${id}`, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to fetch');
  return response.json();
};