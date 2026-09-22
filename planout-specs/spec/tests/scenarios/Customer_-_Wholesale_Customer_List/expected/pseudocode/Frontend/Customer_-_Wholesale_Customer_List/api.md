/**
 * API Contract Implementation
 */
export const fetchWholesaleCustomers = async (params) => {
  // Maps to GET /customers/wholesale
  // Logic: Filter parameters are passed as query strings
  return await apiClient.get('/customers/wholesale', { params });
};