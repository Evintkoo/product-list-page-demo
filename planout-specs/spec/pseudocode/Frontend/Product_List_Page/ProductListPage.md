Component: ProductListPage
Asset: assets/67ab07a3-36e5-4169-bc37-60c90863d1d8.svg

Purpose:
  Top-level page for browsing, searching, sorting, and paginating the Product catalog.
  Composes MainMenu, SubMenu, ProductFilterBar, ProductTable, and Pagination controls.

Imports:
  - MainMenu (shared component, "Products" tab forced active)
  - SubMenu (shared component, "Products" tab forced active)
  - ProductFilterBar (see ProductFilterBar.tsx)
  - ProductTable (see ProductTable.tsx)
  - useProductList (custom hook, see useProductList.ts)
  - navigate (router helper)

State (delegated to useProductList hook):
  - filters: { search, category, status, brandName }
  - sortBy: string (default "createdAt")
  - sortOrder: "asc" | "desc" (default "desc")
  - page: integer (default 1)
  - pageSize: integer (default 20)
  - products: array of Product rows
  - totalCount: integer
  - isLoading: boolean
  - errorMessage: string | null

On Mount (Page Load):
  1. Call hook function `fetchProducts()` with default filters, default sort,
     page = 1, pageSize = 20.
  2. This triggers GET /api/products with query parameters:
       page, pageSize, search, category, status, brandName, sortBy, sortOrder
     (only include a param in the request if it currently has a non-empty value,
     except page/pageSize/sortBy/sortOrder which always default as noted above).
  3. On success (200): map response body fields directly onto the product rows
     using DATA SCHEMA field names (no renaming):
       id, SKU, productName, brandName, productCode, tax, price,
       category, stockQuantity, status, createdAt, updatedAt
     Store totalCount, page, pageSize from response for pagination controls.
  4. On failure (400/500): display `error` message from response body in an
     inline banner above the table; keep previous product list visible if any.

Render:
  - MainMenu component, with "Products" tab flagged as active.
  - SubMenu component, with "Products" tab flagged as active.
  - "Add Product" button (top-right of page):
      On click -> navigate to Add Product page route.
      (No API call from this button; pure navigation transition.)
  - ProductFilterBar component:
      Props: current filter values, onApplySearch callback, onFieldChange callback.
  - Error banner (conditional on errorMessage).
  - Loading indicator (conditional on isLoading).
  - ProductTable component:
      Props: products, sortBy, sortOrder, onSortChange callback, onRowClick callback.
  - Pagination control:
      Props: page, pageSize, totalCount, onPageChange callback.
      Displays current page, total pages (ceil(totalCount / pageSize)),
      "Previous"/"Next" controls, disabled appropriately at boundaries.

Callback: onSortChange(columnName)
  - If columnName === current sortBy:
      Toggle sortOrder ("asc" -> "desc" -> "asc" ...). First click after switching
      column always starts at "asc".
  - Else:
      Set sortBy = columnName, sortOrder = "asc" (ascending-first rule).
  - Reset page to 1.
  - Re-run fetchProducts() with updated sortBy/sortOrder/page.

Callback: onPageChange(newPage)
  - Validate newPage is between 1 and ceil(totalCount / pageSize); ignore otherwise.
  - Set page = newPage.
  - Re-run fetchProducts() with updated page (filters and sort unchanged).

Callback: onRowClick(productId)
  - Navigate to Product Details page route, passing productId as path parameter.