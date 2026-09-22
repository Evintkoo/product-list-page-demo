/**
 * Fetches a paginated list of Purchase Orders for Standard Assets.
 * Includes computed counts for related documents (Returns, Invoices, Deliveries).
 */
FUNCTION getPurchaseOrders(filters, pagination):
    QUERY baseQuery = SELECT 
        po.id, 
        po.ref_code, 
        po.supplier_ref_code, 
        po.warehouse_id, 
        po.created_at, 
        po.due_at, 
        po.workflow_state, 
        po.supplier_id, 
        po.total, 
        po.is_closed,
        (SELECT COUNT(*) FROM Return r WHERE r.purchase_order_id = po.id) AS return_count,
        (SELECT COUNT(*) FROM Invoice i WHERE i.purchase_order_id = po.id) AS invoice_count,
        (SELECT COUNT(*) FROM Delivery d WHERE d.purchase_order_id = po.id) AS delivery_count
    FROM PurchaseOrder po
    WHERE po.type = 'Standard'
    APPLY filters (ref_code, supplier_id, workflow_state, date_range)
    ORDER BY po.created_at DESC
    LIMIT pagination.limit OFFSET pagination.offset

    RETURN baseQuery.execute()