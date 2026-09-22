/**
 * Data access layer for Payment Types.
 * Handles retrieval, filtering, and pagination logic for the Finance module.
 */

FUNCTION getPaymentTypes(filters, pagination):
    // Construct base query for PaymentType entity
    query = SELECT * FROM PaymentType

    // Apply search filters if provided
    IF filters.search_term IS NOT NULL:
        query = query.WHERE(name LIKE %filters.search_term%)

    // Apply pagination
    // Calculate offset based on page and page_size
    offset = (pagination.page - 1) * pagination.page_size
    query = query.LIMIT(pagination.page_size).OFFSET(offset)

    // Execute query
    results = query.execute()

    // Get total count for pagination metadata
    total_items = SELECT COUNT(*) FROM PaymentType
    total_pages = CEIL(total_items / pagination.page_size)

    RETURN {
        data: results,
        pagination: {
            page: pagination.page,
            page_size: pagination.page_size,
            total_pages: total_pages,
            total_items: total_items
        }
    }