/**
 * Fetches a paginated list of Sales Order Returns with joined relations 
 * for display in the /sales_order_returns table.
 */
FUNCTION getSalesOrderReturnsList(page, pageSize, filters):
    QUERY = SELECT 
        sor.id AS sales_order_return_id,
        sor.ref_code,
        si.ref_code AS sales_invoice_ref_code,
        sor.sales_invoice_id,
        so.ref_code AS sales_order_ref_code,
        sor.sales_order_id,
        sor.created_at,
        sor.received_at,
        sor.approved_at,
        w.name AS warehouse_name,
        c.name AS customer_name,
        sor.workflow_state,
        u.name AS updated_by
    FROM SalesOrderReturn sor
    LEFT JOIN SalesInvoice si ON sor.sales_invoice_id = si.id
    LEFT JOIN SalesOrder so ON sor.sales_order_id = so.id
    LEFT JOIN Warehouse w ON sor.warehouse_id = w.id
    LEFT JOIN Customer c ON sor.customer_id = c.id
    LEFT JOIN User u ON sor.updated_by_user_id = u.id
    ORDER BY sor.created_at DESC
    LIMIT pageSize OFFSET (page - 1) * pageSize

    RETURN QUERY.execute()