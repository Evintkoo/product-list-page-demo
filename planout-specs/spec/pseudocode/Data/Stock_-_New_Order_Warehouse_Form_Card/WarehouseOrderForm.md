// Component logic for the New Order Warehouse Form Card
COMPONENT WarehouseOrderForm:
  IMPORT useWarehouseOptions, useCreateStockOrder

  STATE selectedWarehouseId = NULL
  STATE orderType = "RESTOCK"
  
  CONST { data: warehouses, isLoading } = useWarehouseOptions()
  CONST { mutate: createOrder } = useCreateStockOrder()

  FUNCTION handleSubmit:
    IF selectedWarehouseId IS NOT NULL:
      createOrder({ warehouse_id: selectedWarehouseId, order_type: orderType })

  RENDER:
    // Form Card UI
    // Dropdown populated by 'warehouses'
    // Submit button triggers 'handleSubmit'