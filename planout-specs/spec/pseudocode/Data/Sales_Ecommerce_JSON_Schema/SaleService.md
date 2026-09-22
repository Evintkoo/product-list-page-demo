/**
 * Orchestrates the retrieval of ecommerce sales and formats the response
 * to match the SaleEcommerceListResponse JSON Schema.
 */
async function fetchEcommerceSalesList(requestParams) {
  const { data, totalCount } = await SaleRepository.getEcommerceSales(
    requestParams.filters,
    requestParams.pagination
  );

  // Map database rows to the expected API response structure
  return {
    data: data.map(row => ({
      sale_id: row.sale_id,
      ref_code: row.ref_code,
      ecommerce_ref_code: row.ecommerce_ref_code,
      created_at: row.created_at,
      completed_at: row.completed_at,
      customer_id: row.customer_id,
      customer_name: row.customer_name,
      vehicle_id: row.vehicle_id,
      vehicle_registration: row.vehicle_registration,
      workflow_state: row.workflow_state,
      store_id: row.store_id,
      store_name: row.store_name,
      delivery_method: "Store Pickup", // Hardcoded based on observed system behavior
      source: row.source,
      total: row.total
    })),
    pagination: {
      limit: requestParams.pagination.limit,
      offset: requestParams.pagination.offset,
      total: totalCount
    }
  };
}