/**
 * Fetches paginated tax records based on filter criteria.
 * Maps database entities to the Tax Response Shape.
 */
FUNCTION getTaxList(filters: {
  is_active?: boolean,
  date_option?: string,
  from_date?: string,
  to_date?: string,
  page?: number,
  page_limit?: number,
  tax_id?: string
}) {
  SET limit = MIN(filters.page_limit OR 100, 200)
  SET offset = (filters.page OR 1 - 1) * limit

  // Build query with optional filters
  QUERY baseQuery = SELECT * FROM Tax
  IF filters.is_active IS NOT NULL THEN
    baseQuery.WHERE(is_active = filters.is_active)
  
  IF filters.tax_id THEN
    baseQuery.WHERE(id = filters.tax_id)

  // Date filtering logic
  IF filters.from_date AND filters.to_date THEN
    SET dateField = (filters.date_option == '2') ? 'updated_at' : 'created_at'
    baseQuery.WHERE(dateField BETWEEN filters.from_date AND filters.to_date)

  // Execute count for pagination metadata
  SET totalRecords = baseQuery.COUNT()
  
  // Fetch paginated results
  SET data = baseQuery.LIMIT(limit).OFFSET(offset).FETCH()

  // Hydrate related entities (Supplier, Warehouse, User, Journal, Lines)
  FOR EACH tax IN data:
    tax.supplier = FETCH_SUPPLIER(tax.supplier_id)
    tax.warehouse = FETCH_WAREHOUSE(tax.warehouse_id)
    tax.created_by = FETCH_USER(tax.created_by_id)
    tax.updated_by = FETCH_USER(tax.updated_by_id)
    tax.journal = FETCH_JOURNAL(tax.journal_id)
    tax.purchase_delivery_lines = FETCH_TAX_LINES(tax.id)
    tax.summary = CALCULATE_SUMMARY(tax.purchase_delivery_lines)

  RETURN {
    records: totalRecords,
    pages: CEIL(totalRecords / limit),
    result: data
  }
}

/**
 * Fetches minimal tax data for dropdown/select components.
 */
FUNCTION getTaxOptions() {
  RETURN SELECT id, ref_code FROM Tax WHERE workflow_state = 'active'
}