FUNCTION getProductStocks(productId, queryParams):
    // 1. Validate Product existence
    product = DB.Product.findUnique({ where: { id: productId } })
    IF NOT product:
        RETURN 404 "Product not found"

    // 2. Fetch Company Settings for cost calculation logic
    settings = DB.CompanySettings.findFirst()
    
    // 3. Build base query for StoreStock joined with Store
    // Apply filters: store_id, store_code, and pagination
    query = DB.StoreStock.findMany({
        where: { product_id: productId },
        include: { Store: true },
        skip: (queryParams.page - 1) * queryParams.page_limit,
        take: queryParams.page_limit
    })

    // 4. Fetch related data for the specific product in one snapshot
    reservations = DB.Reservation.findMany({ where: { product_id: productId } })
    inTransits = DB.InTransit.findMany({ where: { product_id: productId } })

    // 5. Process and Transform
    results = query.map(stockRow => {
        // Resolve average_cost based on company settings
        effectiveCost = settings.use_company_average_cost 
            ? settings.company_average_cost 
            : stockRow.average_cost

        // Aggregate related quantities
        reservedQty = reservations
            .filter(r => r.store_id == stockRow.store_id)
            .reduce((sum, r) => sum + r.quantity, 0)
            
        inTransitQty = inTransits
            .filter(i => i.store_id == stockRow.store_id)
            .reduce((sum, i) => sum + i.quantity, 0)

        RETURN {
            store_id: stockRow.store_id,
            store_code: stockRow.Store.store_code,
            quantity: stockRow.quantity,
            min_qty: stockRow.min_qty,
            max_qty: stockRow.max_qty,
            average_cost: effectiveCost,
            reserved: reservedQty,
            in_transit: inTransitQty,
            total_cost: stockRow.quantity * effectiveCost
        }
    })

    // 6. Apply show_stock filter (include_zero_quantity logic)
    IF NOT queryParams.show_stock:
        results = results.filter(item => item.quantity > 0)

    RETURN 200, {
        data: results,
        summary: {
            total_qty: results.reduce((sum, item) => sum + item.quantity, 0)
        }
    }