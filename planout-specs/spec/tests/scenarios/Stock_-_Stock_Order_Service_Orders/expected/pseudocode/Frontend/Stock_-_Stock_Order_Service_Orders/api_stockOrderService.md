/**
 * API Service layer for Stock Orders.
 */
export const fetchStockOrders = async (params) => {
  // Construct query string from params:
  // ref_code, source_ref_code, created_at_from, created_at_to, 
  // store_id (maps to store_name), warehouse_id (maps to warehouse_name), 
  // workflow_state, source_type, limit, offset
  
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`/api/stock-orders?${queryString}`, {
    method: 'GET'
  });
  
  if (!response.ok) throw new Error('Failed to fetch stock orders');
  return response.json();
};