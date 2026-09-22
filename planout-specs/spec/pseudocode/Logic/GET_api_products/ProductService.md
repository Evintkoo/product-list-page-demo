FUNCTION findAll(page, limit):
    // Calculate offset for database query
    SET offset = (page - 1) * limit

    // Fetch total count for metadata
    SET totalCount = DATABASE.Product.COUNT()

    // Fetch paginated records
    SET products = DATABASE.Product.FIND_MANY(
        SELECT id, name, sku, price, stock_quantity, created_at
        ORDER BY created_at DESC
        LIMIT limit
        OFFSET offset
    )

    // Return structured response
    RETURN {
        "data": products,
        "metadata": {
            "page": page,
            "limit": limit,
            "total_count": totalCount <!-- MISSING_FIELD: Product.total_count -->
        }
    }