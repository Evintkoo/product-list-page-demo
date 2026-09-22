/**
 * Fetches the list of sales deliveries with support for filtering, 
 * pagination, and sorting.
 */
function getSalesDeliveries(filters, pagination, sorting) {
    // Map UI filter parameters to API query parameters
    const queryParams = {
        sales_delivery: filters.delivery_number,
        reference_no: filters.reference_number,
        sales_order: filters.sales_order_id,
        sales_invoice: filters.sales_invoice_id,
        customer: filters.customer_id,
        warehouse: filters.warehouse_id,
        from_date: filters.from_date,
        to_date: filters.to_date,
        status: filters.workflow_state,
        page: pagination.page,
        sort_by: sorting.column
    };

    return API.get("/sales-deliveries", { params: queryParams });
}

/**
 * Fetches the list of warehouses for the filter dropdown.
 */
function getWarehouses() {
    return API.get("/warehouses");
}