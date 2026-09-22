/**
 * Data access layer for Product entities.
 * Handles filtering, pagination, and search logic for the Product List Page.
 */

FUNCTION getProducts(filters: { 
    searchQuery?: string, 
    categoryId?: uuid, 
    status?: string, 
    page: integer, 
    pageSize: integer 
}) {
    
    // Initialize base query
    QUERY q = SELECT * FROM Product;

    // Apply Search Filter
    IF filters.searchQuery IS NOT NULL THEN
        q = q.WHERE(name LIKE %filters.searchQuery% OR sku LIKE %filters.searchQuery%);
    END IF;

    // Apply Category Filter
    IF filters.categoryId IS NOT NULL THEN
        q = q.WHERE(category_id == filters.categoryId);
    END IF;

    // Apply Status Filter
    IF filters.status IS NOT NULL THEN
        q = q.WHERE(status == filters.status);
    END IF;

    // Apply Pagination
    OFFSET = (filters.page - 1) * filters.pageSize;
    q = q.LIMIT(filters.pageSize).OFFSET(OFFSET);

    // Execute and return results with total count for UI pagination metadata
    RETURN {
        data: q.EXECUTE(),
        totalCount: SELECT COUNT(*) FROM Product WHERE (filters applied)
    };
}

FUNCTION getCategories() {
    // Fetch all categories for the filter dropdown
    RETURN SELECT * FROM Category ORDER BY name ASC;
}