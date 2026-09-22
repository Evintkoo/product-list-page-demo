/**
 * Maps the database entity to the UI-friendly response shape.
 */

FUNCTION mapToReturnListResponse(data):
    RETURN data.map(item => {
        RETURN {
            "Return No": item.ref_code,
            "Order No": item.source_order_ref_code,
            "Date": item.created_at,
            "Sent At": item.sent_at,
            "Approved Date": item.approved_at,
            "From Store": item.from_store_name,
            "Supplier": item.supplier_name,
            "Warehouse": item.warehouse_name,
            "Status": item.workflow_state,
            "User": item.user_name
        }
    })