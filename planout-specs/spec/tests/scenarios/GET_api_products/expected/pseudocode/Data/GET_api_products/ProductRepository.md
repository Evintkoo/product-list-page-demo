/**
 * Data access layer for Product entities.
 * Handles database interaction for the GET /api/products endpoint.
 */

FUNCTION getProducts(page: integer, limit: integer):
    // Calculate offset for SQL pagination
    SET offset = (page - 1) * limit

    // Fetch total count for metadata
    SET totalCount = SELECT COUNT(*) FROM Product

    // Fetch paginated records
    SET productList = SELECT id, name, sku, price, stock_quantity, created_at 
                      FROM Product 
                      ORDER BY created_at DESC 
                      LIMIT limit 
                      OFFSET offset

    RETURN {
        data: productList,
        meta: {
            total: totalCount,
            page: page,
            limit: limit
        }
    }

// Handle potential database connection errors or query failures
ON DATABASE_ERROR:
    THROW InternalServerError("Database query failed")

// Handle cases where no products exist (empty set is valid, not 404)
ON EMPTY_RESULT:
    RETURN {
        data: [],
        meta: {
            total: 0,
            page: page,
            limit: limit
        }
    }