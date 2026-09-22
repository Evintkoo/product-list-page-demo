/**
 * Fetches the Purchase Return Standard by ID within the authenticated company scope.
 */
function findById(id: uuid, companyId: uuid): PurchaseReturnStandard | null {
  return db.purchase_return_standards.find({ id: id, company_id: companyId });
}

/**
 * Updates the Purchase Return Standard and its associated items.
 * Performs the state transition and updates audit fields.
 */
function approvePurchaseReturn(
  id: uuid, 
  items: Array<{ id: uuid, supplier_confirmed_quantity: decimal }>,
  notes: string | null,
  userId: uuid
): PurchaseReturnStandard {
  return db.transaction(() => {
    // 1. Update the header
    const updatedRecord = db.purchase_return_standards.update(id, {
      workflow_state: "Approved / Confirmed by Supplier",
      approved_at: now(),
      updated_at: now(),
      updated_by: userId,
      notes: notes
    });

    // 2. Update individual item quantities
    for (const item of items) {
      db.purchase_return_items.update(item.id, {
        supplier_confirmed_quantity: item.supplier_confirmed_quantity
      });
    }

    return updatedRecord;
  });
}