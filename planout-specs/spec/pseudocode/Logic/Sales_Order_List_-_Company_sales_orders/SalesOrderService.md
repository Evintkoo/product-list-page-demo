/**
 * Fetches the list of Sales Orders based on provided filter criteria.
 * Maps the raw API response to the UI-friendly table format.
 */
async function fetchSalesOrders(query: SalesOrderListQuery) {
    // Construct query parameters, omitting null/undefined values
    const params = cleanQueryParameters(query);
    
    const response = await api.get("/api/sales-orders", { params });
    
    if (response.status === 200) {
        return {
            rows: response.data.map(mapSalesOrderToTable),
            pagination: response.pagination
        };
    }
    
    throw new Error("Failed to fetch sales orders");
}

/**
 * Maps raw SalesOrder entity data to the table display format.
 */
function mapSalesOrderToTable(order: SalesOrder) {
    return {
        ref_code: order.document_number,
        external_ref_code: order.purchase_order_number,
        created_at: order.created_at,
        due_at: order.order_date, // <!-- MISSING_FIELD: SalesOrder.due_at -->
        warehouse_name: order.warehouse_id, // <!-- MISSING_FIELD: Warehouse.name -->
        customer_name: order.customer_id,   // <!-- MISSING_FIELD: Customer.name -->
        salesperson_name: order.salesperson_id, // <!-- MISSING_FIELD: Salesperson.name -->
        status: order.status,
        closed: order.status === 'closed', // <!-- MISSING_FIELD: SalesOrder.closed -->
        delivery_count: 0, // <!-- MISSING_FIELD: SalesOrder.delivery_count -->
        invoice_count: 0,  // <!-- MISSING_FIELD: SalesOrder.invoice_count -->
        return_count: 0    // <!-- MISSING_FIELD: SalesOrder.return_count -->
    };
}