// Contains the business logic for building the filtered, paginated
// query used by both "Page Load" and "Apply Search" flows.

FUNCTION searchProducts(criteria):
    // 1. Build a base query against the Product entity
    SET query = ProductRepository.createQuery()

    // 2. Apply free-text search across relevant fields
    IF criteria.searchTerm IS NOT EMPTY THEN
        query = query.whereAny([
            { field: "SKU", operator: "contains", value: criteria.searchTerm },
            { field: "productName", operator: "contains", value: criteria.searchTerm },
            { field: "brandName", operator: "contains", value: criteria.searchTerm },
            { field: "productCode", operator: "contains", value: criteria.searchTerm }
        ])
    END IF

    // 3. Apply explicit filters if provided
    IF criteria.categoryFilter IS NOT NULL THEN
        query = query.where("category", equals, criteria.categoryFilter)
    END IF

    IF criteria.statusFilter IS NOT NULL THEN
        query = query.where("status", equals, criteria.statusFilter)
    END IF

    IF criteria.brandFilter IS NOT NULL THEN
        query = query.where("brandName", equals, criteria.brandFilter)
    END IF

    // 4. Apply sorting
    query = query.orderBy(criteria.sortBy, criteria.sortOrder)

    // 5. Apply pagination
    SET offset = (criteria.page - 1) * criteria.pageSize
    query = query.limit(criteria.pageSize).offset(offset)

    // 6. Execute query and count total matching records (ignoring pagination)
    SET items = ProductRepository.execute(query)
    SET totalCount = ProductRepository.count(query.withoutPagination())

    RETURN {
        items: items,
        totalCount: totalCount
    }
END FUNCTION