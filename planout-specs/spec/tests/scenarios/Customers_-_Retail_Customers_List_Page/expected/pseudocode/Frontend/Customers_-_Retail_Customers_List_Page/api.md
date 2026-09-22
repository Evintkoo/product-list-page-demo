/**
 * API Contract Implementation
 */
export const fetchCustomers = async (params) => {
  // Maps to GET /api/customers
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/customers?${queryString}`);
  return response.json();
};