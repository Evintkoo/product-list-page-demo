FUNCTION getProductWarehouseStocks(request, response):
    // 1. Validate path parameter
    SET productId = request.params.id
    
    // 2. Verify Product existence
    IF NOT Product.exists(id = productId):
        RETURN response.status(404).json({ error: "Product not found" })

    // 3. Extract query filters and pagination
    SET filters = {
        warehouse_id: request.query.warehouse_id,
        name: request.query.name,
        location_code: request.query.location_code
    }
    SET page = request.query.page OR 1
    SET limit = request.query.limit OR 20

    // 4. Fetch joined data
    // Join WarehouseStock with Warehouse on warehouse_id
    // Apply filters and pagination
    SET stockRecords = WarehouseStock.findMany(
        where: { product_id: productId, ...filters },
        include: Warehouse,
        limit: limit,
        offset: (page - 1) * limit
    )

    // 5. Calculate derived fields
    // Note: reserved_quantity, in_transit_quantity, and total_cost are calculated 
    // based on business logic rules for the specific ERP implementation.
    FOR EACH record IN stockRecords:
        record.reserved_quantity = calculateReserved(record) <!-- MISSING_FIELD: WarehouseStock.reserved_quantity -->
        record.in_transit_quantity = calculateInTransit(record) <!-- MISSING_FIELD: WarehouseStock.in_transit_quantity -->
        record.total_cost = calculateCost(record) <!-- MISSING_FIELD: WarehouseStock.total_cost -->
    END FOR

    // 6. Prepare response
    SET totalCount = WarehouseStock.count(where: { product_id: productId, ...filters })
    
    RETURN response.status(200).json({
        total_quantity: totalCount,
        data: stockRecords
    })