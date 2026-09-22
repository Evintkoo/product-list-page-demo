/**
 * Fetches a paginated list of SalesOrders based on provided query parameters.
 * Implements filtering, sorting, and pagination logic.
 */
FUNCTION getSalesOrders(query: SalesOrderListQuery):
    // 1. Initialize base query from SalesOrder entity
    // 2. Apply filters if present in query:
    IF query.document_number IS NOT NULL:
        FILTER BY document_number LIKE %query.document_number%
    IF query.purchase_order_number IS NOT NULL:
        FILTER BY purchase_order_number LIKE %query.purchase_order_number%
    IF query.date_from IS NOT NULL AND query.date_to IS NOT NULL:
        FILTER BY order_date BETWEEN query.date_from AND query.date_to
    IF query.warehouse_id IS NOT NULL:
        FILTER BY warehouse_id == query.warehouse_id
    IF query.customer_id IS NOT NULL:
        FILTER BY customer_id == query.customer_id
    IF query.salesperson_id IS NOT NULL:
        FILTER BY salesperson_id == query.salesperson_id
    IF query.status IS NOT NULL:
        FILTER BY status == query.status

    // 3. Apply sorting
    ORDER BY query.sort DIRECTION query.direction

    // 4. Apply pagination
    LIMIT query.limit
    OFFSET query.offset

    RETURN list of SalesOrder records