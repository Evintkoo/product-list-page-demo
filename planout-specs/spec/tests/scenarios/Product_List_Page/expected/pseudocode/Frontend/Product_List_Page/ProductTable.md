Component: ProductTable

Purpose:
  Renders the sticky header row and the product rows, using the mapping
  rules from the JSON response to the visible columns.

Props:
  - products: array of Product rows (id, SKU, productName, brandName,
    productCode, tax, price, category, stockQuantity, status, createdAt, updatedAt)
  - sortBy: string
  - sortOrder: "asc" | "desc"
  - onSortChange(columnName): callback
  - onRowClick(productId): callback

Column-to-field mapping (authoritative, from mapping rules node):
  - SKU column          -> Product.SKU
  - Name column          -> Product.productName
  - Brand column         -> Product.brandName
  - Product Code column  -> Product.productCode
  - Tax column           -> Product.tax
  - Price column         -> Product.price
  - Status column        -> Product.status      (sortable, per Table Header Row)
  - Stock column         -> Product.stockQuantity (sortable, per Table Header Row)

Table Header Row:
  - Sticky positioned at top of scroll container.
  - Each sortable column title (Name, Status, Price, Stock, and any other
    displayed column configured as sortable) renders a sort caret icon.
  - On header cell click:
      Call onSortChange(columnName) using the schema field name that backs
      that column (productName, status, price, stockQuantity, etc.).
      Caret icon visually flips depending on current sortOrder for that column
      when sortBy === columnName; otherwise caret is neutral/inactive.
  - Sort behavior contract (enforced in parent via onSortChange):
      First click on a column -> ascending.
      Second consecutive click on same column -> descending.
      Alternates thereafter.

Row Selector (first two columns):
  - The Name column and the SKU column render their cell content as
    hyperlink/hypertext.
  - On click of either hyperlink:
      Call onRowClick(row.id) to navigate to the Product Details page for
      that product's id.

Row rendering (per product row):
  - SKU cell: display row.SKU as hyperlink (row selector).
  - Name cell: display row.productName as hyperlink (row selector).
  - Brand cell: display row.brandName as plain text.
  - Product Code cell: display row.productCode as plain text.
  - Tax cell: display row.tax formatted as a numeric/decimal value.
  - Price cell: display row.price formatted as currency; column header
    additionally exposes a dropdown to filter by price range
    <!-- ORPHAN_FIELD: priceRange --> (not present in GET /api/products
    query parameters; rendered for UX parity only, not wired to any request
    until the API contract defines a price-range filter parameter).
  - Status cell: display row.status as plain text/badge.
  - Stock cell: display row.stockQuantity as plain numeric text.

Empty/loading states:
  - If products array is empty and not loading: render "No products found"
    placeholder row spanning the table width.
```