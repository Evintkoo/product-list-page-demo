/**
 * Component: StockOutgoingDetails
 * Renders the full information for a single Stock Outgoing document.
 * State-driven UI based on `workflow_state`.
 */

// Asset: assets/b4a15d78-6133-4e30-ac26-199e2bf5c3ec.svg (Draft)
// Asset: assets/796b1c9e-7bcf-46ef-babd-896a8830a7be.svg (Confirmed)
// Asset: assets/c1319c73-f671-4a91-9541-ff90d0a22ed0.svg (Approved)
// Asset: assets/7d64e25e-bdbf-455d-8c92-c12267857c01.svg (Cancelled)

function StockOutgoingDetails({ id }) {
  const { data: stockOutgoing, isLoading } = useFetchStockOutgoing(id);

  // Header Section
  // Displays: ref_code, supplier_ref_code, entity_name, source_name, source_type, 
  // creator_name, updater_name, notes, created_at, updated_at, due_at, approved_at, journal_ref_code
  
  // Workflow Bar Logic:
  // - Draft: Print, Confirm, Cancel buttons. Edit button at bottom.
  // - Confirmed: Print, Approve, Cancel buttons.
  // - Approved: Print button. Shows Reversal Account column and Journal row.
  // - Cancelled: Print, Reset buttons.

  // Product Table:
  // Columns: line_no, sku, product_name, product_code, order_quantity, average_cost, order_amount, expense_account_name
  // Conditional Column: reversal_account_name (only if workflow_state === 'approved')
  
  // Footer:
  // Total row: Sum of order_quantity and order_amount.
}