/**
 * Executes the paginated query for PaymentTypeMapping records.
 * Scoped to the authenticated user's company_id.
 */
FUNCTION getPaymentTypeMappings(company_id, filters, pagination):
    // filters: { store_id, payment_type_id, is_active }
    // pagination: { limit, offset }

    QUERY base_query = SELECT * FROM PaymentTypeMapping
    WHERE company_id = company_id

    // Apply dynamic filters
    IF filters.store_id IS NOT NULL:
        base_query.WHERE(store_id = filters.store_id)
    
    IF filters.payment_type_id IS NOT NULL:
        base_query.WHERE(payment_type_id = filters.payment_type_id)
        
    IF filters.is_active IS NOT NULL:
        base_query.WHERE(is_active = filters.is_active)

    // Get total count for metadata
    INT total_count = base_query.COUNT()

    // Apply ordering and pagination
    // Requirement: Always ordered by created_at ascending
    LIST results = base_query
        .ORDER_BY(created_at ASC)
        .LIMIT(pagination.limit)
        .OFFSET(pagination.offset)
        .FETCH()

    RETURN {
        data: results,
        metadata: {
            total_count: total_count,
            limit: pagination.limit,
            offset: pagination.offset
        }
    }