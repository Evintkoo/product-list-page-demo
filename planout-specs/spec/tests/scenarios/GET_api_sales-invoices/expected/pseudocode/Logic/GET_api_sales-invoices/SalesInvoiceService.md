FUNCTION ListInvoices(company_id, filters, pagination, sorting):
    // Build base query scoped to company
    query = SELECT * FROM sales_invoices WHERE company_id = company_id

    // Apply Filters
    IF filters.document_number IS NOT NULL:
        query = query.WHERE(document_number LIKE filters.document_number + "%")
    
    IF filters.sales_order_id IS NOT NULL:
        query = query.WHERE(sales_order_id = filters.sales_order_id)
        
    IF filters.customer_name IS NOT NULL:
        query = query.WHERE(customer_name LIKE "%" + filters.customer_name + "%")
        
    IF filters.workflow_state IS NOT NULL:
        query = query.WHERE(workflow_state = filters.workflow_state)

    // Get total count before pagination
    total_count = query.COUNT()

    // Apply Sorting and Pagination
    // Note: Current implementation hard-codes ORDER BY created_at DESC 
    // despite query parameter availability.
    query = query.ORDER_BY("created_at DESC")
    query = query.LIMIT(pagination.limit).OFFSET(pagination.offset)

    RETURN query.EXECUTE(), total_count