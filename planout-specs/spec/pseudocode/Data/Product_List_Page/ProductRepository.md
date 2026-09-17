/**
 * Data access layer for Product entities.
 * Handles database queries for the Product List Page, including filtering and pagination.
 */

FUNCTION getProducts(filterCriteria, paginationParams):
    // Construct base query for Product entity
    query = SELECT * FROM Product

    // Apply filtering based on search input (e.g., productName or SKU)
    IF filterCriteria.searchQuery IS NOT NULL:
        query = query.WHERE(productName LIKE %filterCriteria.searchQuery% OR sku LIKE %filterCriteria.searchQuery%)

    // Apply brand filtering if provided
    IF filterCriteria.brandName IS NOT NULL:
        query = query.AND(brandName == filterCriteria.brandName)

    // Apply pagination
    query = query.LIMIT(paginationParams.pageSize)
    query = query.OFFSET(paginationParams.offset)

    RETURN execute(query)

FUNCTION getProductCount(filterCriteria):
    // Returns total count for pagination metadata
    query = SELECT COUNT(*) FROM Product
    IF filterCriteria.searchQuery IS NOT NULL:
        query = query.WHERE(productName LIKE %filterCriteria.searchQuery% OR sku LIKE %filterCriteria.searchQuery%)
    
    RETURN execute(query)