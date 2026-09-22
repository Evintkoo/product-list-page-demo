/**
 * Maps raw API response objects to the UI table structure.
 */
function mapPurchaseReturnToTable(data) {
    return data.map(item => ({
        ref_code: item.ref_code,
        return_type: item.return_type,
        created_at: item.created_at,
        sent_at: item.sent_at,
        approved_at: item.approved_at,
        warehouse_name: item.warehouse_name,
        supplier_name: item.supplier_name,
        workflow_state: item.workflow_state
    }));
}