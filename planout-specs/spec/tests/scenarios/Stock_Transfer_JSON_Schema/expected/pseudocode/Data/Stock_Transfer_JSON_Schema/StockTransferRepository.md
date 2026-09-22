/**
 * Handles persistence logic for Stock Transfers.
 * Ensures atomicity between header and line items.
 */

function createStockTransfer(data: StockTransferCreateRequest) {
  // 1. Generate UUID for idempotency check
  // 2. Start Database Transaction
  // 3. Snapshot current stock levels for source/dest and average cost
  // 4. Insert into stock_transfers (workflow_state = 'draft')
  // 5. Insert into stock_transfer_items (calculating transfered_amount)
  // 6. Commit Transaction
}

function getStockTransferList(params: StockTransferListQueryParams) {
  // Executes query with pagination and joins for location names and user names
  // Returns data array and pagination metadata
}

function getStockTransferDetail(id: UUID) {
  // Executes query joining locations and all six potential user actors
  // Fetches associated items via Stock Transfer Detail Items Query
}

function transitionWorkflow(id: UUID, transition: WorkflowTransitionRequest) {
  // 1. Start Database Transaction
  // 2. Update workflow_state and stamp transition_at/transition_by columns
  // 3. If transition == 'receive':
  //    - Update received_qty for items
  //    - Recalculate received_amount
  // 4. If transition == 'send' or 'receive':
  //    - Trigger accounting journal entry
  // 5. Commit Transaction
}