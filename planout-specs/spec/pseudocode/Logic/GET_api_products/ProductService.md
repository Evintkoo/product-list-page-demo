FUNCTION getPaginatedProducts(page, limit):
    offset = (page - 1) * limit

    // Query Product storage, ordered by created_at descending (most recent first)
    items = Database.query Product
                WHERE true (no filters applied for base listing)
                ORDER BY created_at DESC
                LIMIT limit
                OFFSET offset

    totalCount = Database.count Product records (no filters)

    RETURN {
        items: items,
        totalCount: totalCount
    }