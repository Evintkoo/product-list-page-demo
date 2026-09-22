/**
 * Maps the enriched PurchaseOrder data to the UI list columns.
 */
FUNCTION mapToUIList(order) {
    RETURN {
        "Ref Code": order.ref_code,
        "Reference No": order.supplier_ref_code,
        "Warehouse": order.warehouse_name,
        "Date": order.created_at,
        "Due At": order.due_at,
        "Status": order.workflow_state,
        "Supplier": order.supplier_name,
        "Amount": order.total,
        "Closed": order.is_closed,
        "Returns": order.returns_count,
        "Invoices": order.invoices_count,
        "Deliveries": order.deliveries_count
    };
}