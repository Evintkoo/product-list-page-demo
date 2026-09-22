Function patchStatus(newStatus):
  // Calls PATCH /api/sales-order-returns/:id/:status
  // Payload: { status: newStatus }
  // On success: Refresh page data to reflect new workflow_state and timestamps
  API.patch("/api/sales-order-returns/" + record_id + "/" + newStatus, {
    status: newStatus
  })

// ORPHAN_FIELD: items (The schema defines SalesOrderReturnItem, but the API response for GET /api/sales-order-returns/:id does not explicitly list an 'items' array field in the provided payload definition.)