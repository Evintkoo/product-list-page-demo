// Hook to manage data fetching for the Stock Return Warehouse Form
// This provides the necessary lists for the searchable dropdowns

function useStockReturnData() {
  // Fetch list of stores for "Return From" dropdown
  const { data: stores } = useQuery("stores", fetchStores);

  // Fetch list of warehouses for "To Warehouse" dropdown
  const { data: warehouses } = useQuery("warehouses", fetchWarehouses);

  // Fetch list of internal suppliers for "Return To Internal Supplier" dropdown
  const { data: suppliers } = useQuery("suppliers", fetchInternalSuppliers);

  return { stores, warehouses, suppliers };
}