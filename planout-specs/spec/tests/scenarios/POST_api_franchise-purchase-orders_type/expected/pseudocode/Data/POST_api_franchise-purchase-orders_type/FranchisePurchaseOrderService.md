/**
 * Orchestrates the creation of a Franchise Purchase Order within a single transaction.
 * Maps :type to internal/external constants and ensures data integrity.
 */
async function createFranchisePurchaseOrder(type, payload, session) {
  const orderType = (type === 'internal') ? 'franchise_internal' : 'franchise_external';

  return await database.transaction(async (tx) => {
    // 1. Validate request against business rules (Supplier, Product, Warehouse, etc.)
    await validatePurchaseOrder(tx, { ...payload, orderType, company_id: session.company_id });

    // 2. Insert primary StockOrder record
    const [stockOrder] = await tx('StockOrder').insert({
      company_id: session.company_id,
      stock_order_type: orderType,
      from_warehouse_id: payload.from_warehouse_id,
      to_store_id: payload.to_store_id,
      supplier_id: payload.supplier_id,
      supplier_ref_code: payload.supplier_ref_code,
      due_at: payload.due_at,
      notes: payload.notes,
      request_uuid: payload.request_uuid,
      workflow_state: 'draft',
      creator_id: session.creator_id,
      created_at: new Date()
    }).returning('*');

    // 3. Insert line items
    const itemsToInsert = payload.items.map(item => ({
      stock_order_id: stockOrder.id,
      product_id: item.product_id,
      order_qty: item.order_qty,
      supply_price: item.supply_price, // Loaded during validation
      store_remark: item.store_remark
    }));
    await tx('StockOrderItem').insert(itemsToInsert);

    // 4. Calculate and update total order amount
    const totalAmount = calculateTotal(payload.items);
    await tx('StockOrder').where({ id: stockOrder.id }).update({ order_amount: totalAmount });

    // 5. Log initial workflow state
    await tx('StockOrderWorkflowHistory').insert({
      stock_order_id: stockOrder.id,
      changed_by: session.creator_id,
      workflow_state: 'draft',
      created_at: new Date()
    });

    return { ...stockOrder, items: itemsToInsert, order_amount: totalAmount };
  });
}