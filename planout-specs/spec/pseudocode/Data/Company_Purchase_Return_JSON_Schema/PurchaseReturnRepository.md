/**
 * Executes the creation of a Company Purchase Return within a single atomic transaction.
 * Ensures data integrity between the header and its associated line items.
 */
async function createCompanyPurchaseReturn(payload) {
  return await database.transaction(async (tx) => {
    // 1. Insert Header
    const [header] = await tx('company_purchase_return')
      .insert({
        ref_code: payload.ref_code,
        supplier_ref_code: payload.supplier_ref_code,
        return_type: payload.return_type,
        supplier_id: payload.supplier_id,
        warehouse_id: payload.warehouse_id,
        purchase_invoice_id: payload.purchase_invoice_id,
        purchase_order_id: payload.purchase_order_id,
        purchase_delivery_id: payload.purchase_delivery_id,
        notes: payload.notes,
        subtotal_amount: payload.subtotal_amount,
        discount_amount: payload.discount_amount,
        tax_amount: payload.tax_amount,
        total_amount: payload.total_amount,
        workflow_state: payload.workflow_state,
        request_uuid: payload.request_uuid,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');

    const returnId = header.company_purchase_return_id;

    // 2. Insert Items
    if (payload.items && payload.items.length > 0) {
      const itemsToInsert = payload.items.map(item => ({
        company_purchase_return_id: returnId,
        product_id: item.product_id,
        return_quantity: item.return_quantity,
        supplier_price: item.supplier_price,
        reason: item.reason,
        created_at: new Date(),
        updated_at: new Date()
      }));

      await tx('company_purchase_return_item').insert(itemsToInsert);
    }

    return header;
  });
}