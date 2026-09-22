// API Endpoints for the Stock Outgoing feature
// GET /api/stock-outgoings/:id
function handleGetStockOutgoing(req, res) {
  const data = getStockOutgoingDetails(req.params.id);
  res.json(data);
}

// PATCH /api/stock-outgoings/:id/:action
function handleWorkflowAction(req, res) {
  const updatedDoc = updateWorkflowState(req.params.id, req.params.action);
  res.json(updatedDoc);
}

// POST /api/stock-outgoings/:id/approve
// Handles the final approval screen save
function handleApproveDocument(req, res) {
  // 1. Update line items with recalculated costs and reversal accounts
  // 2. Generate journal entry
  // 3. Set workflow_state to 'approved'
  // 4. Set approved_at timestamp
  const approvedDoc = finalizeApproval(req.params.id, req.body.items);
  res.json(approvedDoc);
}