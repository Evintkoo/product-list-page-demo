/**
 * API Service for Sales Order operations
 */

export const fetchSalesOrders = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/sales-orders?${queryString}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch sales orders');
  }

  return response.json(); // Returns array of SalesOrder entities
};