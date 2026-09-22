-- Retrieves paginated stock history for a specific product
-- Parameters: $1 (productId), $2 (limit), $3 (offset)
SELECT 
    id, 
    warehouseId, 
    productId, 
    type, 
    referenceCode, 
    quantityChanged, 
    notes, 
    createdBy, 
    createdAt
FROM warehouse_stock_history
WHERE productId = $1
ORDER BY createdAt DESC
LIMIT $2 OFFSET $3;