// Defines the persistent storage shape for the Product List Page feature.
// This is the single source of truth for field names/casing used by the
// Logic swimlane's query builder and the Frontend swimlane's table columns.

TABLE Product
  id            : uuid, primary key, auto-generated
  SKU           : string, required, unique                // maps to "SKU" column on screen
  productName   : string, required                        // maps to "Name" column on screen
  brandName     : string, required                        // maps to "Brand" column on screen
  productCode   : string, required, unique                // maps to "Product Code" column on screen
  tax           : decimal, required, default 0            // maps to "Tax" column on screen
  price         : decimal, required                        // maps to "Price" column on screen
  category      : string, nullable                        // used as a filter facet, not in mapping rules but needed for "filters" scope
  stockQuantity : integer, nullable                        // used for availability filter/badge
  status        : string, nullable (e.g. "active", "inactive", "discontinued") // used for status filter
  createdAt     : datetime, auto-set on insert
  updatedAt     : datetime, auto-set on update

INDEXES
  - INDEX on productName        // supports search-by-name
  - INDEX on brandName          // supports filter-by-brand
  - INDEX on category           // supports filter-by-category
  - INDEX on SKU (unique)       // supports search-by-sku, guarantees uniqueness
  - INDEX on productCode (unique)
  - COMPOSITE INDEX on (brandName, category, price) // supports combined filter + sort scenarios

NOTES FOR DOWNSTREAM SWIMLANES
  - Field names above ("SKU", "productName", "brandName", "productCode", "tax", "price",
    "category", "stockQuantity", "status", "createdAt", "updatedAt", "id") are final and
    must be reused verbatim by the Logic swimlane's query/response objects and by the
    Frontend swimlane's list/table bindings.
  - The Logic swimlane's list endpoint should accept filter parameters that map directly
    to: brandName, category, status, and a price range (priceMin, priceMax), plus a free-text
    "search" parameter that matches against productName, SKU, and productCode.
  - Pagination parameters expected by the Logic swimlane: page (integer, 1-based) and
    pageSize (integer). The data layer returns both the page of records and a totalCount
    so the Logic swimlane can compute total pages for the Frontend swimlane.