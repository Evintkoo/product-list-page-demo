// Logic to fetch the full document aggregate for the detail view
function getStockOutgoingDetails(id) {
  // Fetch the header record
  const header = db.StockOutgoing.find(id);
  
  // Fetch all associated line items
  const items = db.StockOutgoingItem.findAll({ where: { stock_outgoing_id: id } });
  
  // Return combined object for the API response
  return {
    ...header,
    items: items
  };
}

// Logic for workflow state transitions
function updateWorkflowState(id, action) {
  const document = db.StockOutgoing.find(id);
  
  switch(action) {
    case 'confirm':
      // Validate stock availability for all items before transition
      validateStockAvailability(document.items);
      document.workflow_state = 'confirmed';
      break;
    case 'cancel':
      document.workflow_state = 'cancelled';
      break;
    case 'reset':
      document.workflow_state = 'draft';
      break;
  }
  
  return document.save();
}