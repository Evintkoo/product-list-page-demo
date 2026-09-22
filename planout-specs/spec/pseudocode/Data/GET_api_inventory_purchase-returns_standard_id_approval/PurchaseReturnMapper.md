/**
 * Transforms the database entity into the API response schema.
 */
function mapToApprovalResponse(record: PurchaseReturn) {
  return {
    header: {
      id: record.id,
      workflow_state: record.workflow_state,
      notes: record.notes
    },
    warehouse: {
      id: record.warehouse.id,
      name: record.warehouse.name
    },
    supplier: {
      id: record.supplier.id,
      name: record.supplier.name
    },
    items: record.items.map(item => ({
      id: item.id,
      quantity_returned: item.quantity_returned,
      supplier_confirmed_quantity: item.supplier_confirmed_quantity
    })),
    supplier_confirmed_total: record.items.reduce((sum, item) => sum + item.supplier_confirmed_quantity, 0)
  };
}