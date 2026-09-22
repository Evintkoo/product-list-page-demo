/**
 * Logic for fetching and updating Purchase Return (Standard) details.
 */

export const getPurchaseReturnDetails = async (id) => {
  // Fetch main PurchaseReturn record
  const purchaseReturn = await db.PurchaseReturn.findUnique({ where: { id } });
  
  // Fetch associated items
  const items = await db.PurchaseReturnItem.findMany({ 
    where: { purchase_return_id: id } 
  });

  // Calculate totals for the UI summary row
  const totals = items.reduce((acc, item) => ({
    remaining_qty: acc.remaining_qty + (item.remaining_qty || 0),
    warehouse_qty: acc.warehouse_qty + (item.warehouse_qty || 0),
    return_qty: acc.return_qty + (item.return_qty || 0),
    supplier_confirmed_qty: acc.supplier_confirmed_qty + (item.supplier_confirmed_qty || 0),
    confirmed_qty: acc.confirmed_qty + (item.confirmed_qty || 0)
  }), { remaining_qty: 0, warehouse_qty: 0, return_qty: 0, supplier_confirmed_qty: 0, confirmed_qty: 0 });

  return { ...purchaseReturn, items, totals };
};

export const sendToSupplier = async (id) => {
  return await db.PurchaseReturn.update({
    where: { id },
    data: { 
      status: 'sent_to_supplier',
      sent_at: new Date() 
    }
  });
};

export const approvePurchaseReturn = async (id) => {
  return await db.PurchaseReturn.update({
    where: { id },
    data: { 
      status: 'approved_confirmed_by_supplier',
      approved_at: new Date() 
    }
  });
};

// Note: The following fields are referenced in the mapping but require external lookups:
// <!-- MISSING_FIELD: PurchaseReturn.purchase_delivery_ids -->
// <!-- MISSING_FIELD: PurchaseReturn.journal_entry_ids -->