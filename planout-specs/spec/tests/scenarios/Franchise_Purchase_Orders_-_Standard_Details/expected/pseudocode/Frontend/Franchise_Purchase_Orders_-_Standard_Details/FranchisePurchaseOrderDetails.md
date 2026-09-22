/**
 * Component: FranchisePurchaseOrderDetails
 * Displays the standard details for a Franchise Purchase Order.
 * Asset: assets/efb80bb6-15dd-48bb-8a36-0153e98d031e.svg
 */

// 1. Initialization & Data Fetching
// On mount, call:
// GET /api/franchise-purchase-orders/:id
// GET /api/franchise-purchase-orders/:id/items

// 2. State Management
// - workflow_state: derived from the GET response.
// - Active Tab: "Details" (default) or "Invoices".
// - Pop-up visibility states: Confirmation, Place Order, Print.

// 3. Header & Navigation
// - Page Header: "Franchise Purchase Order Standard (External)"
// - Main Menu: "Inventory" tab active.
// - Sub Menu: "Store" tab active.
// - Workflow Status Bar: Displays current status (Draft, Store Confirmed, Ordered, Store Received).

// 4. Details Mapping (from GET /api/franchise-purchase-orders/:id)
// - Document No: ref_code
// - Reference Number: supplier_ref_code
// - From Direct Supplier: supplier_name (clickable link)
// - Deliver To: store_name (clickable link)
// - Created By: creator_name
// - Updated By: updater_name
// - Notes: notes
// - Created At: created_at
// - Updated At: updated_at
// - Due Date: due_at
// - Placed At: placed_at
// - Received Date: received_at
// - Journal: journal_ref_code

// 5. Items Table (from GET /api/franchise-purchase-orders/:id/items)
// Columns:
// - No.: line_no
// - SKU: sku (clickable link to Product Details)
// - Product: product_name
// - Product Code: product_code
// - Order: quantity
// - Receive: received_quantity
// - Supply Price Exc. Tax (Rp): supply_price
// - Discount: discount
// - Order Amount: order_amount
// - Receive Amount (Rp): receive_amount

// 6. Totals Section
// - SubTotal: subtotal
// - Total Discount: discount_total
// - Net Subtotal: net_subtotal
// - Tax: tax_total
// - Total: total

// 7. Action Buttons (Conditional based on workflow_state)
// - Confirm: Opens Confirmation Pop up (PATCH /api/franchise-purchase-orders/:id/confirm)
// - Cancel: Opens Confirmation Pop up (PATCH /api/franchise-purchase-orders/:id/cancel)
// - Reset: Opens Confirmation Pop up (PATCH /api/franchise-purchase-orders/:id/reset)
// - Sending: Opens "Place Order with Supplier" pop up (PATCH /api/franchise-purchase-orders/:id/place)
// - Receive: Opens Review State (PATCH /api/franchise-purchase-orders/:id/receive)
// - Print: Opens Print pop up
// - Export: Exports table data