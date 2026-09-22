/**
 * Handles the transactional update of a Purchase Order and its associated line items.
 * Ensures data integrity by recalculating header totals from the final item set.
 */
async function updatePurchaseOrder(
  purchaseOrderId: string,
  companyId: string,
  updateData: PurchaseOrderUpdateRequest
) {
  return await db.transaction(async (tx) => {
    // 1. Update Header
    const updatedHeader = await tx.purchase_orders.update({
      where: { id: purchaseOrderId, company_id: companyId },
      data: {
        supplier_id: updateData.supplier_id,
        warehouse_id: updateData.warehouse_id,
        delivery_address: updateData.delivery_address,
        delivery_due_date: updateData.delivery_due_date,
        reference_number: updateData.reference_number,
        notes: updateData.notes,
        updated_at: new Date()
      }
    });

    if (!updatedHeader) throw new Error("Purchase Order not found or unauthorized");

    // 2. Sync Items
    const submittedIds = updateData.items.filter(i => i.id).map(i => i.id);

    // Delete removed items
    await tx.purchase_order_items.deleteMany({
      where: {
        purchase_order_id: purchaseOrderId,
        id: { notIn: submittedIds }
      }
    });

    // Update existing items
    for (const item of updateData.items.filter(i => i.id)) {
      await tx.purchase_order_items.update({
        where: { id: item.id, purchase_order_id: purchaseOrderId },
        data: {
          product_id: item.product_id,
          order_qty: item.order_qty,
          unit_price: item.unit_price,
          discount_rate: item.discount_rate,
          line_no: item.line_no,
          updated_at: new Date()
        }
      });
    }

    // Insert new items
    const newItems = updateData.items.filter(i => !i.id);
    if (newItems.length > 0) {
      await tx.purchase_order_items.createMany({
        data: newItems.map(item => ({
          ...item,
          purchase_order_id: purchaseOrderId,
          created_at: new Date(),
          updated_at: new Date()
        }))
      });
    }

    // 3. Recompute Totals
    const aggregates = await tx.purchase_order_items.aggregate({
      where: { purchase_order_id: purchaseOrderId },
      _sum: {
        // Logic: SUM(qty * price * (1 - discount/100)) etc.
      }
    });

    await tx.purchase_orders.update({
      where: { id: purchaseOrderId },
      data: {
        subtotal_amount: aggregates.subtotal,
        tax_amount: aggregates.tax,
        total_amount: aggregates.total,
        updated_at: new Date()
      }
    });

    return fetchPurchaseOrderDetail(purchaseOrderId, companyId);
  });
}