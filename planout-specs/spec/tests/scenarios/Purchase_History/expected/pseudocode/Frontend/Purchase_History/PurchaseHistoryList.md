// Node ID: 6b026891-3040-4a9e-8b89-70582705c7ea
// Title: Purchase History
// Description: List all purchase records tied to a product.
// Previous Node: None
// Next Node: None
// Asset: assets/5f296374-83c4-4b33-804f-f15d049e3c4e.svg

Component PurchaseHistoryList(props: { productId: UUID }) {
  // State:
  // - purchases: Array<PURCHASE> (Fetched from API)
  // - isLoading: boolean
  // - error: string | null

  // API Call:
  // GET /products/:id/purchases
  // Path Parameter: :id = props.productId

  // Logic:
  // 1. On mount, call GET /products/:id/purchases.
  // 2. Map response body to a table.
  // 3. Display fields: supplier_name, purchase_date, quantity, unit_price.

  // Happy Path:
  // - Data is fetched and rendered in a table format.
  // - Dates are formatted for readability.

  // Validation/Error:
  // - If response is 404, display "No purchase history found for this product".
  // - If network error, display "Failed to load purchase history".

  // Empty State:
  // - If purchases array is empty, display "No records available".

  // Side Effects:
  // - None.

  // Notes covered:
  // - List all purchase records tied to a product.
}