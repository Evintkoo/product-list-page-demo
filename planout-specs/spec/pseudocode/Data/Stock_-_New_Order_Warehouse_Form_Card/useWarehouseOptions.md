// Hook to fetch available warehouses for the New Order Form dropdown
FUNCTION useWarehouseOptions():
  RETURN useQuery({
    queryKey: ["warehouses", "active"],
    queryFn: () => API.get("/warehouses?status=active")
  })