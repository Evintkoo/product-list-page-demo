/**
 * Data access layer for Voucher entities.
 * Handles the retrieval of voucher details including joined product and user metadata.
 */

FUNCTION getVoucherById(voucher_id: UUID):
    // Execute query joining voucher, product, and user tables
    // The query filters by primary key and returns a flat result set
    // that maps to the Voucher Response Schema.
    
    QUERY = """
        SELECT 
            v.voucher_id, 
            v.product_id, 
            p.sku AS product_sku, 
            p.name AS product_name,
            v.voucher_type, 
            v.price_ex_tax, 
            v.value, 
            v.open_price,
            v.valid_from, 
            v.valid_until, 
            v.status,
            v.created_at, 
            v.updated_at
        FROM voucher v
        JOIN product p ON p.product_id = v.product_id
        WHERE v.voucher_id = :voucher_id
    """
    
    RETURN database.execute(QUERY, { voucher_id })