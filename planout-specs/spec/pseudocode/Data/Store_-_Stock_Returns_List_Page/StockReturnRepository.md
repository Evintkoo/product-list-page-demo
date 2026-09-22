/**
 * Data access layer for Stock Returns.
 * Fetches paginated stock return records with joined store, warehouse, and user details.
 */

FUNCTION getStockReturnsList(filters, pagination):
    QUERY = SELECT 
        sr.ref_code, 
        sr.created_at, 
        sr.sent_at, 
        sr.approved_at, 
        s.name AS from_store_name, 
        w.name AS warehouse_name, 
        sr.workflow_state, 
        u.full_name AS created_by
    FROM StockReturn sr
    JOIN Store s ON sr.from_store_id = s.id
    JOIN Warehouse w ON sr.warehouse_id = w.id
    JOIN User u ON sr.created_by_user_id = u.id
    WHERE (apply filters if present)
    ORDER BY sr.created_at DESC
    LIMIT pagination.limit OFFSET pagination.offset

    RETURN QUERY.execute()