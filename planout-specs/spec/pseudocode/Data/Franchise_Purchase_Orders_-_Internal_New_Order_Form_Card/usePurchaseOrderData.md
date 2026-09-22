/**
 * Custom hook to manage the data fetching requirements for the 
 * Franchise Purchase Order New Order Form.
 */
function usePurchaseOrderData() {
  // Fetches the list of available suppliers for the dropdown
  const { data: suppliers } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => api.get('/suppliers')
  });

  // Fetches the list of available stores for the searchable dropdown
  const { data: stores } = useQuery({
    queryKey: ['stores'],
    queryFn: () => api.get('/stores')
  });

  // Fetches the list of available warehouses for the dropdown
  const { data: warehouses } = useQuery({
    queryKey: ['warehouses'],
    queryFn: () => api.get('/warehouses')
  });

  return {
    suppliers,
    stores,
    warehouses
  };
}