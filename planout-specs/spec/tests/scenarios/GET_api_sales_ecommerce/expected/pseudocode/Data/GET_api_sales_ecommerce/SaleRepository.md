/**
 * Executes the paginated query for Ecommerce Sales.
 * Filters by source = 'ecommerce' by default.
 */
FUNCTION getEcommerceSales(filters: {
  limit: integer,
  offset: integer,
  startDate: datetime,
  endDate: datetime,
  status: string
}) {
  
  // Base query scoped to ecommerce source
  QUERY baseQuery = SELECT * FROM Sale 
                    WHERE source = 'ecommerce'

  // Apply optional filters
  IF filters.startDate IS NOT NULL:
    baseQuery.WHERE(created_at >= filters.startDate)
  
  IF filters.endDate IS NOT NULL:
    baseQuery.WHERE(created_at <= filters.endDate)
    
  IF filters.status IS NOT NULL:
    baseQuery.WHERE(status = filters.status)

  // Apply pagination and sorting
  // Default: limit 20, offset 0, sorted by created_at DESC
  RETURN baseQuery
    .ORDER_BY(created_at DESC)
    .LIMIT(filters.limit OR 20)
    .OFFSET(filters.offset OR 0)
    .EXECUTE()
}