/**
 * Data access layer for Product entities.
 * Handles the retrieval of product information from the database.
 */

FUNCTION getProductById(productId: UUID):
    // Query the Product table joined with Category for full context
    SELECT 
        p.id, 
        p.sku, 
        p.name, 
        p.description, 
        p.price, 
        p.currency, 
        p.stock_quantity, 
        c.name AS category_name
    FROM Product p
    LEFT JOIN Category c ON p.category_id = c.id
    WHERE p.id = productId
    LIMIT 1