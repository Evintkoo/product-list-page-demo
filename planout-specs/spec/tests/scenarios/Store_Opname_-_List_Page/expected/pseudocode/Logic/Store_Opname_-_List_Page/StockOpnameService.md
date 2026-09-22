/**
 * Logic to fetch and map Stock Opname data for the List Page.
 * Maps internal database entities to the UI-specific response schema.
 */

export const fetchStockOpnameList = async (filters: StockOpnameFilters) => {
  const response = await apiClient.get('/stock_takes', { params: filters });
  
  return response.data.map((item: any) => ({
    stock_opname_id: item.id,
    ref_code: item.reference_number,
    document_date: item.scheduled_date,
    store_name: item.warehouse_id, // Resolved via join with Warehouse entity
    workflow_state: item.status,
    completed_at: item.completed_at, <!-- MISSING_FIELD: StockOpname.completed_at -->
    notes: item.notes, <!-- MISSING_FIELD: StockOpname.notes -->
    updated_by: item.updated_by <!-- MISSING_FIELD: StockOpname.updated_by -->
  }));
};