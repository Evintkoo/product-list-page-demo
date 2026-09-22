// Component: Sale Item Table
// Asset: assets/19995779-ce8c-4d57-b38b-2ac8fa4e40fe.svg

// Fields per row:
// - Item (product_id): Required. Searchable dropdown.
// - Qty (quantity): Required. Numeric input.
// - Price (unit_price): Read-only (auto-filled).
// - Discount (discount_amount): Read-only.
// - Amount (subtotal): Read-only (Qty * Price).

// Logic:
// - Add Item appends an empty row.
// - Remove control deletes the row.
// - Total Item counts rows with products.