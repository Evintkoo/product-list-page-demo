/**
 * Fetches a paginated list of Stock Orders filtered by source_type and optional search criteria.
 * 
 * @param params - Query parameters for filtering and pagination
 * @returns Promise containing the list of StockOrder entities and metadata
 */
async function getStockOrders(params: {
  source_type: string,
  ref_code?: string,
  created_at_from?: string,
  created_at_to?: string,
  store_id?: string,
  warehouse_id?: string,
  workflow_state?: string[],
  limit: number,
  offset: number
}) {
  // Construct query string dynamically, ensuring source_type is always present
  const query = new URLSearchParams({
    source_type: params.source_type,
    limit: params.limit.toString(),
    offset: params.offset.toString(),
    ...(params.ref_code && { ref_code: params.ref_code }),
    ...(params.created_at_from && { created_at_from: params.created_at_from }),
    ...(params.created_at_to && { created_at_to: params.created_at_to }),
    ...(params.store_id && { store_id: params.store_id }),
    ...(params.warehouse_id && { warehouse_id: params.warehouse_id }),
    ...(params.workflow_state && { workflow_state: params.workflow_state.join(',') })
  });

  const response = await fetch(`/api/stock-orders?${query.toString()}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch stock orders");
  }

  return await response.json();
}