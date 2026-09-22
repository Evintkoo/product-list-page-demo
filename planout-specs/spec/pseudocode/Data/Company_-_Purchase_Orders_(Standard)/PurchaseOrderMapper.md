/**
 * Maps the database record to the UI-friendly Purchase Order Response Schema.
 */
FUNCTION mapToPurchaseOrderResponse(record):
    RETURN {
        "ref_code": record.ref_code,
        "supplier_ref_code": record.supplier_ref_code,
        "warehouse_id": record.warehouse_id,
        "created_at": record.created_at,
        "due_at": record.due_at,
        "workflow_state": record.workflow_state,
        "supplier_id": record.supplier_id,
        "total": record.total,
        "is_closed": record.is_closed,
        "returns": record.return_count,
        "invoices": record.invoice_count,
        "deliveries": record.delivery_count
    }