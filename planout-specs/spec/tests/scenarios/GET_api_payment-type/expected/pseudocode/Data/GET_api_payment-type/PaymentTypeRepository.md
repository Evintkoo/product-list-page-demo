/**
 * Fetches a paginated list of PaymentTypes filtered by company, status, and kind.
 * Results are strictly ordered by name ascending.
 */
FUNCTION getPaymentTypes(companyId, filters, pagination):
    QUERY = SELECT * FROM PaymentType
    WHERE company_id = companyId

    // Apply optional filters
    IF filters.is_active IS NOT NULL:
        QUERY = QUERY.WHERE(is_active = filters.is_active)
    
    IF filters.kind IS NOT NULL:
        QUERY = QUERY.WHERE(kind = filters.kind)

    // Apply ordering
    QUERY = QUERY.ORDER_BY(name ASC)

    // Apply pagination
    TOTAL_COUNT = QUERY.COUNT()
    DATA = QUERY.LIMIT(pagination.limit).OFFSET(pagination.offset).FETCH()

    RETURN {
        data: DATA,
        meta: {
            total: TOTAL_COUNT,
            limit: pagination.limit,
            offset: pagination.offset
        }
    }