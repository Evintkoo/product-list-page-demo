Custom Hook: useProductList

Purpose:
  Encapsulate all state and network logic for the product list: filters,
  sorting, pagination, and the GET /api/products call. Shared by
  ProductListPage so UI components stay presentational.

Internal State:
  - filters: { search: "", category: "", status: "", brandName: "" }
  - sortBy: "createdAt"
  - sortOrder: "desc"
  - page: 1
  - pageSize: 20
  - products: []
  - totalCount: 0
  - isLoading: false
  - errorMessage: null

Function: fetchProducts(overrides = {})
  1. Merge current state with any overrides (used for sort/page changes without
     waiting for a full filter re-apply).
  2. Set isLoading = true, clear errorMessage.
  3. Build query object for GET /api/products:
       page: current page
       pageSize: current pageSize
       search: filters.search (omit if empty string)
       category: filters.category (omit if empty string)
       status: filters.status (omit if empty string)
       brandName: filters.brandName (omit if empty string)
       sortBy: current sortBy
       sortOrder: current sortOrder
  4. Call GET /api/products with the query object exactly as specified above.
     Do not rename or add query parameters beyond the ones defined in the
     API payload contract (page, pageSize, search, category, status,
     brandName, sortBy, sortOrder).
  5. On response 200:
       - Set products = response.body mapped to rows using schema field names:
           id, SKU, productName, brandName, productCode, tax, price,
           category, stockQuantity, status, createdAt, updatedAt
       - Set totalCount = response.body.totalCount
       - Set page = response.body.page
       - Set pageSize = response.body.pageSize
  6. On response 400 or 500:
       - Set errorMessage = response.body.error
       - Keep products unchanged (do not clear the table).
  7. Set isLoading = false.

Function: applyFilters(newFilters)
  - Replace filters with newFilters (already validated by ProductFilterBar
    before this is called).
  - Reset page to 1.
  - Call fetchProducts().

Expose to consumers:
  filters, sortBy, sortOrder, page, pageSize, products, totalCount,
  isLoading, errorMessage, fetchProducts, applyFilters,
  setSortBy/setSortOrder helpers (used internally by onSortChange in the page).