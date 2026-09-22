// Hook to handle the submission of the New Order Warehouse Form
FUNCTION useCreateStockOrder():
  RETURN useMutation({
    mutationFn: (orderData: { warehouse_id: uuid, order_type: string }) => 
      API.post("/stock-orders", {
        warehouse_id: orderData.warehouse_id,
        order_type: orderData.order_type,
        status: "DRAFT"
      }),
    onSuccess: (data) => {
      // Invalidate cache to refresh inventory lists
      queryClient.invalidateQueries(["stock-orders"])
    }
  })