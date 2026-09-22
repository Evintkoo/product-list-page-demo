/**
 * Fetches aggregated stock data for a specific product across all stores.
 * 
 * @param productId - The UUID of the product
 * @param filters - Object containing store_id, name, store_code, show_stock, page, page_limit
 */
FUNCTION getProductStockReport(productId, filters):
    // 1. Validate Product existence
    IF NOT EXISTS(SELECT 1 FROM Product WHERE id = productId) THEN
        THROW NotFoundException("Product not found")

    // 2. Fetch Company Cost Mode
    // Used to determine if we use global average or store-specific average_cost
    settings = SELECT use_company_average_cost, company_average_cost FROM CompanySettings LIMIT 1

    // 3. Build Query
    // Join StoreStock with Stores, Reservations, and InTransit
    // Group by store_id to aggregate quantities
    query = SELECT 
        s.id AS store_id,
        s.store_code,
        ss.quantity,
        ss.min_qty,
        ss.max_qty,
        // Resolve average_cost based on company settings
        CASE 
            WHEN settings.use_company_average_cost THEN settings.company_average_cost 
            ELSE ss.average_cost 
        END AS effective_cost,
        // Aggregate reservations and in_transit for the specific store/product
        (SELECT SUM(quantity) FROM Reservation r WHERE r.product_id = productId AND r.store_id = s.id) AS reserved,
        (SELECT SUM(quantity) FROM InTransit it WHERE it.product_id = productId AND it.store_id = s.id) AS in_transit
    FROM Store s
    LEFT JOIN StoreStock ss ON ss.store_id = s.id AND ss.product_id = productId
    WHERE 1=1
    
    // Apply filters
    IF filters.store_id THEN query.WHERE(s.id = filters.store_id)
    IF filters.store_code THEN query.WHERE(s.store_code = filters.store_code)
    
    // Handle show_stock logic (include_zero_quantity)
    IF NOT filters.show_stock THEN
        query.WHERE(ss.quantity > 0)

    // 4. Execute and Compute
    results = query.PAGINATE(filters.page, filters.page_limit).EXECUTE()
    
    FOR row IN results:
        row.total_cost = row.quantity * row.effective_cost
        row.reserved = row.reserved OR 0
        row.in_transit = row.in_transit OR 0

    // 5. Calculate Summary
    summary = {
        total_qty: SUM(results.quantity)
    }

    RETURN { data: results, meta: summary }