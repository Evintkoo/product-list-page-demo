/**
 * Fetches a paginated list of items for a specific stock order.
 * Scoped by company_id to ensure data isolation.
 */
FUNCTION getStockOrderItems(stock_order_id: UUID, company_id: UUID, filters: Object, pagination: Object):
    // 1. Verify the Stock Order exists and belongs to the authenticated company
    order = DB.StockOrder.findFirst({
        where: { id: stock_order_id, company_id: company_id }
    })

    IF order IS NULL:
        THROW NotFoundError("Stock Order not found")

    // 2. Fetch the items
    // Results are returned in insertion order (created_at ASC)
    items = DB.StockOrderItem.findMany({
        where: { 
            stock_order_id: stock_order_id,
            // Apply optional filters (e.g., product_name search)
            ...filters 
        },
        orderBy: { created_at: "ASC" },
        skip: pagination.offset,
        take: pagination.limit
    })

    // 3. Calculate total count for pagination metadata
    total_count = DB.StockOrderItem.count({
        where: { stock_order_id: stock_order_id, ...filters }
    })

    // 4. Return structured response
    // Note: 'No' column is calculated in the presentation layer based on index
    RETURN {
        items: items,
        total_order_qty: order.total_order_qty,
        pagination: {
            total: total_count,
            limit: pagination.limit,
            offset: pagination.offset
        }
    }