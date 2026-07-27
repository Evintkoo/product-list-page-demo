// Data access layer used exclusively by the Logic swimlane. No business rules here —
// only storage/query concerns. This is where filtering, searching, and pagination are
// physically executed against the Product table.

FUNCTION getProductList(filters, pagination):
  INPUT filters:
    - search      : string, optional   // matched against productName, SKU, productCode
    - brandName   : string, optional
    - category    : string, optional
    - status      : string, optional
    - priceMin    : decimal, optional
    - priceMax    : decimal, optional
  INPUT pagination:
    - page        : integer, default 1
    - pageSize    : integer, default 20

  BEGIN
    baseQuery = SELECT * FROM Product

    IF filters.search is provided:
      baseQuery.WHERE productName ILIKE "%search%"
                 OR SKU ILIKE "%search%"
                 OR productCode ILIKE "%search%"

    IF filters.brandName is provided:
      baseQuery.WHERE brandName = filters.brandName

    IF filters.category is provided:
      baseQuery.WHERE category = filters.category

    IF filters.status is provided:
      baseQuery.WHERE status = filters.status

    IF filters.priceMin is provided:
      baseQuery.WHERE price >= filters.priceMin

    IF filters.priceMax is provided:
      baseQuery.WHERE price <= filters.priceMax

    totalCount = COUNT(baseQuery)

    results = baseQuery
                .ORDER BY productName ASC
                .OFFSET (pagination.page - 1) * pagination.pageSize
                .LIMIT pagination.pageSize

    RETURN {
      items: results,          // array of Product records, fields as defined in Product table
      totalCount: totalCount,  // used by Logic swimlane to compute totalPages
      page: pagination.page,
      pageSize: pagination.pageSize
    }
  END

FUNCTION getProductById(id):
  BEGIN
    RETURN SELECT * FROM Product WHERE id = id LIMIT 1
  END

FUNCTION getDistinctBrandNames():
  // Supports populating the "Brand" filter dropdown on the Frontend swimlane
  BEGIN
    RETURN SELECT DISTINCT brandName FROM Product ORDER BY brandName ASC
  END

FUNCTION getDistinctCategories():
  // Supports populating the "Category" filter dropdown on the Frontend swimlane
  BEGIN
    RETURN SELECT DISTINCT category FROM Product WHERE category IS NOT NULL ORDER BY category ASC
  END