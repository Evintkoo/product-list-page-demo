/**
 * Fetches stock levels for a specific product across all stores.
 * Joins Stock and Store entities to provide context for the UI.
 */
FUNCTION getStocksByProductId(productId):
    RETURN DB.query(
        SELECT 
            s.id AS stock_id,
            st.name AS store_name,
            s.quantity,
            s.last_updated
        FROM Stock s
        JOIN Store st ON s.store_id = st.id
        WHERE s.product_id = productId
    )

/**
 * Fetches the full list of stores for the filter dropdown.
 */
FUNCTION getAllStores():
    RETURN DB.query(
        SELECT id, name 
        FROM Store
    )