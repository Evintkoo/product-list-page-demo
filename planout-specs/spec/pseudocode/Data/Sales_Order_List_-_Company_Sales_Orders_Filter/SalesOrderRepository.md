/**
 * Handles the data retrieval logic for the Sales Order List.
 * Maps incoming filter parameters to database query constraints.
 */
FUNCTION fetchSalesOrders(query: SalesOrderQuery):
    // 1. Initialize base query builder for SalesOrder entity
    queryBuilder = Database.selectFrom("SalesOrder")

    // 2. Apply dynamic filters based on provided non-null query parameters
    IF query.document_number IS NOT NULL:
        queryBuilder.where("document_number", "LIKE", query.document_number)
    
    IF query.purchase_order_number IS NOT NULL:
        queryBuilder.where("purchase_order_number", "LIKE", query.purchase_order_number)
        
    IF query.from_date IS NOT NULL:
        queryBuilder.where("order_date", ">=", query.from_date)
        
    IF query.to_date IS NOT NULL:
        queryBuilder.where("order_date", "<=", query.to_date)
        
    IF query.warehouse_id IS NOT NULL:
        queryBuilder.where("warehouse_id", "=", query.warehouse_id)
        
    IF query.customer IS NOT NULL:
        queryBuilder.where("customer_id", "IN", (SELECT id FROM Customer WHERE name LIKE query.customer))
        
    IF query.salesperson IS NOT NULL:
        queryBuilder.where("salesperson_id", "IN", (SELECT id FROM User WHERE name LIKE query.salesperson))
        
    IF query.status IS NOT NULL:
        queryBuilder.where("status", "=", query.status)

    // 3. Apply pagination
    queryBuilder.limit(query.limit)
    queryBuilder.offset(query.offset)

    // 4. Execute and return results
    RETURN queryBuilder.execute()