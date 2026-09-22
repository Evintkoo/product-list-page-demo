/**
 * Data access layer for Purchase Returns.
 * Maps the internal database schema to the API response structure.
 */

FUNCTION getPurchaseReturnsList():
    // Fetch all purchase return records from the database
    records = DB.query("SELECT * FROM PurchaseReturn ORDER BY created_at DESC")
    
    RETURN records.map(record => ({
        ref_code: record.ref_code,
        return_type: record.return_type,
        created_at: record.created_at,
        sent_at: record.sent_at,
        approved_at: record.approved_at,
        warehouse_name: record.warehouse_name,
        supplier_name: record.supplier_name,
        workflow_state: record.workflow_state
    }))