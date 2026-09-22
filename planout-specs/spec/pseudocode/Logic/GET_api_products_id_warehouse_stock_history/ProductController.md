ROUTE GET /api/products/:id/warehouse_stock_history:
    EXTRACT id FROM request.params
    
    // Delegate to service layer
    SET response = ProductStockService.getWarehouseStockHistory(id)
    
    RETURN response