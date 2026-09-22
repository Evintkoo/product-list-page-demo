/**
 * Component: ApproveStockOutgoing
 * Dedicated page for approving a confirmed Stock Outgoing.
 */

// Asset: assets/03055cdc-18b7-4162-abff-f11b5c6e4cea.svg

function ApproveStockOutgoing({ id }) {
  const [notes, setNotes] = useState(stockOutgoing.notes);
  const [items, setItems] = useState(stockOutgoing.items);

  // Validation:
  // - reversal_account_name is required for every item.
  // - Save button triggers PATCH /api/stock-outgoings/:id/confirm
  
  const handleSave = async () => {
    // Payload: { notes, items: [{ id, reversal_account_name }] }
    // <!-- ORPHAN_FIELD: items --> (The API payload for confirm only lists StockOutgoing fields, 
    // but the UI requires updating items with reversal_account_name)
    await api.patch(`/api/stock-outgoings/${id}/confirm`, { 
      // ... payload fields
    });
  };
}