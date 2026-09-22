FUNCTION fetchList(companyId, entityType, filters, pagination):
    // Build query for DiscrepancyStock entity
    SET query = Database.table("DiscrepancyStock")
        .where("company_id", "=", companyId)
        .where("entity_type", "=", entityType)

    // Apply optional filters
    IF filters.sku IS NOT NULL:
        query.where("sku", "=", filters.sku)
    
    IF filters.status IS NOT NULL:
        query.where("status", "=", filters.status)
        
    IF filters.report_date_range.from IS NOT NULL:
        query.where("report_date", ">=", filters.report_date_range.from)
        
    IF filters.report_date_range.to IS NOT NULL:
        query.where("report_date", "<=", filters.report_date_range.to)

    // Apply sorting and pagination
    query.orderBy("created_at", "DESC")
    query.paginate(pagination.page, pagination.limit)

    RETURN query.execute()