/**
 * Fetches a paginated list of suppliers filtered by query parameters.
 * Scoped to the authenticated user's company_id.
 */
FUNCTION getSuppliers(company_id, filters, pagination):
    // Initialize base query
    query = SELECT * FROM Supplier WHERE company_id = company_id

    // Apply dynamic filters if provided in the request
    IF filters.name IS NOT NULL:
        query = query.WHERE(name LIKE %filters.name%)
    
    IF filters.status IS NOT NULL:
        query = query.WHERE(status = filters.status)

    IF filters.tax_id IS NOT NULL:
        query = query.WHERE(tax_id = filters.tax_id)

    // Apply mandatory ordering
    query = query.ORDER_BY(name ASC)

    // Apply pagination
    query = query.LIMIT(pagination.limit)
    query = query.OFFSET(pagination.offset)

    RETURN query.EXECUTE()

/**
 * Helper to validate if a specific supplier exists within the company scope
 * Used for 404 handling logic
 */
FUNCTION existsById(id, company_id):
    count = SELECT COUNT(*) FROM Supplier WHERE id = id AND company_id = company_id
    RETURN count > 0