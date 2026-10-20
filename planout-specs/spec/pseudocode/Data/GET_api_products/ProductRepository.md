/**
 * Data access layer for Product entities.
 * Handles database interaction for the GET /api/products endpoint.
 */

FUNCTION getProducts(page, limit):
    // Calculate offset for SQL pagination
    SET offset = (page - 1) * limit

    // Fetch total count for metadata
    SET totalCount = DATABASE.query("SELECT COUNT(*) FROM Product")

    // Fetch paginated records
    SET products = DATABASE.query(
        "SELECT id, name, sku, price, stock_quantity, created_at 
         FROM Product 
         ORDER BY created_at DESC 
         LIMIT :limit OFFSET :offset",
        { limit: limit, offset: offset }
    )

    RETURN {
        data: products,
        meta: {
            total: totalCount,
            page: page,
            limit: limit
        }
    }

FUNCTION getProductById(id):
    // Fetch a single product record
    SET product = DATABASE.query(
        "SELECT id, name, sku, price, stock_quantity, created_at 
         FROM Product 
         WHERE id = :id",
        { id: id }
    )

    RETURN product // Returns null if not found, handled by service layer