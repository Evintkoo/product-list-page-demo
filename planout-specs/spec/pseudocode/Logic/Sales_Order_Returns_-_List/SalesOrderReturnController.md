/**
 * Handles the retrieval of Sales Order Returns list.
 * Implements the logic for filtering and mapping data for the UI.
 */

function getSalesOrderReturns(filters: QueryParams) {
    // 1. Construct query parameters based on provided filters.
    // Only include non-empty/non-null filters in the request.
    const query = {};
    
    if (filters.ref_code) query.ref_code = filters.ref_code;
    if (filters.created_at_from) query.created_at_from = filters.created_at_from;
    if (filters.created_at_to) query.created_at_to = filters.created_at_to;
    if (filters.warehouse_id) query.warehouse_id = filters.warehouse_id;
    if (filters.customer_name) query.customer_name = filters.customer_name;
    if (filters.workflow_state) query.workflow_state = filters.workflow_state;

    // 2. Call the API
    const response = API.get("/sales_order_returns", { params: query });

    // 3. Return the mapped data for the frontend table
    return response.data.map(item => ({
        sales_order_return_id: item.id,
        ref_code: item.ref_code,
        sales_invoice_ref_code: item.sales_invoice_ref_code,
        sales_invoice_id: item.sales_invoice_id,
        sales_order_ref_code: item.sales_order_ref_code,
        sales_order_id: item.sales_order_id,
        created_at: item.created_at,
        received_at: item.received_at,
        approved_at: item.approved_at,
        warehouse_name: item.warehouse_name,
        customer_name: item.customer_name,
        workflow_state: item.workflow_state,
        updated_by: item.updated_by
    }));
}