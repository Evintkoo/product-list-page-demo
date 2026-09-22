/**
 * Fetches the audit trail for a specific product.
 * Orders results by updated_at descending to show the most recent changes first.
 */
FUNCTION getProductHistoryByProductId(productId: uuid):
    RETURN SELECT * 
    FROM ProductHistory 
    WHERE product_id = productId 
    ORDER BY updated_at DESC;