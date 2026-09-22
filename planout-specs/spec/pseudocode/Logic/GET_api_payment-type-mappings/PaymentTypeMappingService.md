/**
 * Service for querying PaymentTypeMapping data.
 */
FUNCTION listMappings(company_id, filters, pagination):
    // Build query for PaymentTypeMapping entity
    // Scope by company_id (mandatory)
    SET query = Database.select(PaymentTypeMapping).where(company_id == company_id)

    // Apply optional filters
    IF filters.store_id IS NOT NULL:
        query.where(store_id == filters.store_id)
    
    IF filters.payment_type_id IS NOT NULL:
        query.where(payment_type_id == filters.payment_type_id)
        
    IF filters.is_active IS NOT NULL:
        query.where(is_active == filters.is_active)

    // Apply ordering
    query.orderBy(created_at ASC)

    // Get total count for pagination metadata
    SET total_count = query.count()

    // Apply pagination
    SET data = query.limit(pagination.limit).offset(pagination.offset).execute()

    RETURN {
        data: data,
        total_count: total_count,
        limit: pagination.limit,
        offset: pagination.offset
    }