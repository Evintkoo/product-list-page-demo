/**
 * Business logic layer for Product operations.
 */
FUNCTION getAllProducts(page, limit):
    // Calculate offset for database query
    SET offset = (page - 1) * limit

    // Fetch total count for metadata
    SET totalCount = DATABASE.Product.COUNT()

    // Fetch paginated records
    // Fields: id, name, sku, price, created_at
    SET products = DATABASE.Product.FIND_ALL(
        LIMIT: limit,
        OFFSET: offset,
        ORDER_BY: "created_at DESC"
    )

    IF products IS EMPTY:
        RETURN 404 Not Found

    // Return structured response
    RETURN {
        "data": products,
        "metadata": {
            "page": page,
            "limit": limit,
            "total_count": totalCount
        }
    }