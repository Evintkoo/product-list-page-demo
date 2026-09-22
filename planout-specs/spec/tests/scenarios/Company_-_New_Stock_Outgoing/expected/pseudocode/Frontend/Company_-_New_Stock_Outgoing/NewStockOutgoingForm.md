/**
 * Component: NewStockOutgoingForm
 * Asset: assets/481ff37e-1b39-45db-98b7-f9c89dfc7714.svg
 * 
 * State Management:
 * - formState: { source_id, source_type, supplier_ref_code, due_at, notes, service_work_order_ids: [], lines: [] }
 * - stores: Array of { id, name, type: 'Store' }
 * - warehouses: Array of { id, name, type: 'Warehouse' }
 * - accounts: Array of { id, name }
 * - isSaving: boolean
 */

// 1. Initialization
On Page Load:
  - Fetch GET /api/stores and GET /api/warehouses. Combine into a single "From" dropdown list.
  - Fetch GET /api/accounts to populate the "Expense Account" dropdowns in the product table.
  - Initialize formState with empty values.

// 2. Form Interactions
On "From" selection:
  - Update formState.source_id and formState.source_type.
  - Enable "Add Product" button and product search inputs.

On "Add Product" button click:
  - Append a new object to formState.lines: { product_id: null, order_quantity: 0, average_cost: 0, coa_id: null }.

On "Product" search (in row):
  - Trigger search on input change (min 3 chars): GET /api/products?status=:status (with sku_cont, name_cont, product_code_cont).
  - On selection:
    - Call GET /api/products/:id/stocks?location_id=:source_id&location_type=:source_type.
    - Update row with returned Stock Qty and average_cost.

On "Order Qty" change:
  - Update row.order_quantity.
  - Recalculate row.amount = order_quantity * average_cost.
  - Update total row (sum of all order_quantity and all amounts).

// 3. Validation & Submission
Validation Rules:
  - "Save" button is disabled unless:
    - source_id is selected.
    - At least one row exists in lines.
    - Every row has a valid product_id and order_quantity > 0.

On "Save" button click:
  - Set isSaving = true.
  - POST /api/stock-outgoings with payload:
    {
      source_id,
      source_type,
      supplier_ref_code,
      due_at,
      notes,
      service_work_order_ids,
      lines: [ { product_id, order_quantity, average_cost, coa_id } ]
    }
  - On Success: Redirect to Stock Outgoing Details Page.
  - On Failure (e.g., stock check failure): 
    - Display error message against the specific field.
    - Keep form data intact.

On "Cancel" button click:
  - Abandon form and redirect to Stock Outgoings List Page.