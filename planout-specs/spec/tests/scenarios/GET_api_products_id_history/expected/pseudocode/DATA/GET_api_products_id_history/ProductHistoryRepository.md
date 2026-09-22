/**
 * Fetches paginated purchase price history for a specific product.
 * Joins with Vendor to provide context on who offered the price.
 */
FUNCTION getProductPriceHistory(productId: UUID, page: Integer, limit: Integer):
    
    // 1. Validate product existence
    IF NOT EXISTS (SELECT 1 FROM Product WHERE id = productId) THEN
        THROW Error("Product Not Found", 404)
    END IF

    // 2. Calculate offset for pagination
    SET offset = (page - 1) * limit

    // 3. Query history records
    // We order by effective_date descending to show the most recent price changes first
    SET historyRecords = SELECT 
            h.id, 
            h.price, 
            h.effective_date, 
            v.name AS vendor_name,
            v.id AS vendor_id
        FROM PurchasePriceHistory h
        JOIN Vendor v ON h.vendor_id = v.id
        WHERE h.product_id = productId
        ORDER BY h.effective_date DESC
        LIMIT limit OFFSET offset

    // 4. Get total count for pagination metadata
    SET totalCount = SELECT COUNT(*) FROM PurchasePriceHistory WHERE product_id = productId

    RETURN {
        data: historyRecords,
        meta: {
            total: totalCount,
            page: page,
            limit: limit
        }
    }