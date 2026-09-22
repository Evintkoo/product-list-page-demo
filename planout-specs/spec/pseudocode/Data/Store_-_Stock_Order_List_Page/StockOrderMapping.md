/**
 * Transforms raw API response objects into the format required by the Stock Order Table.
 * Ensures only records with source_type 'stock_order' are processed.
 */
function mapStockOrderToTable(data: any[]) {
  return data
    .filter(item => item.source_type === 'stock_order')
    .map(item => ({
      id: item.id,
      displayRefCode: item.ref_code,
      storeId: item.to_store_id,
      warehouseId: item.from_warehouse_id,
      state: item.workflow_state,
      createdAt: new Date(item.created_at).toLocaleDateString()
    }));
}