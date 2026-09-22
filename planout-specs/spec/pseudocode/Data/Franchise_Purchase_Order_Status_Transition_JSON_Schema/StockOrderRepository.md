/**
 * Handles atomic transitions and inventory updates for Franchise Purchase Orders.
 */
class StockOrderRepository {
  
  /**
   * Transitions an order to 'store_received' and updates inventory.
   * Uses a transaction to ensure data integrity across stock tables.
   */
  async receiveOrder(orderId, companyId, userId, payload) {
    return db.transaction(async (tx) => {
      // 1. Lock the order and verify state
      const order = await tx.selectOne(
        "SELECT id, franchise_workflow_state, to_store_id FROM stock_orders WHERE id = ? AND company_id = ? FOR UPDATE",
        [orderId, companyId]
      );

      if (!order || order.franchise_workflow_state !== 'placed') {
        throw new Error("409 Conflict: Order cannot be received in its current state.");
      }

      // 2. Process each line item
      for (const item of payload.items) {
        const { product_id, receive_qty, supply_price: newSupplyPrice } = item;

        // Update item record
        const currentItem = await tx.selectOne("SELECT supply_price FROM stock_order_items WHERE id = ?", [item.id]);
        const unitCost = newSupplyPrice ?? currentItem.supply_price ?? 0;

        await tx.execute(
          "UPDATE stock_order_items SET received_qty = ?, supply_price = ? WHERE id = ?",
          [receive_qty, unitCost, item.id]
        );

        // Update or Insert Store Stock
        const stock = await tx.selectOne(
          "SELECT id, quantity, average_cost FROM store_stocks WHERE store_id = ? AND product_id = ? FOR UPDATE",
          [order.to_store_id, product_id]
        );

        if (stock) {
          await tx.execute(
            "UPDATE store_stocks SET quantity = quantity + ?, average_cost = ?, updated_at = NOW() WHERE id = ?",
            [receive_qty, unitCost, stock.id]
          );
        } else {
          await tx.execute(
            "INSERT INTO store_stocks (id, product_id, sku, store_id, quantity, average_cost, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
            [generateUuid(), product_id, sku, order.to_store_id, receive_qty, unitCost]
          );
        }

        // Log history
        await tx.execute(
          "INSERT INTO store_stock_history (id, store_stock_id, store_id, product_id, quantity, is_increased, type, notes, created_by, created_at) VALUES (?, ?, ?, ?, ?, true, 'FPO', 'Franchise Purchase Order receive', ?, NOW())",
          [generateUuid(), stock?.id, order.to_store_id, product_id, receive_qty, userId]
        );
      }

      // 3. Finalize Order Status
      const refCode = generateEightDigitCode();
      const updated = await tx.execute(
        `UPDATE stock_orders SET 
           franchise_workflow_state = 'store_received', 
           received_at = NOW(), 
           journal_ref_code = ?, 
           supplier_ref_code = COALESCE(?, supplier_ref_code), 
           notes = COALESCE(?, notes), 
           updater_id = ?, 
           updated_at = NOW() 
         WHERE id = ? AND franchise_workflow_state = 'placed'`,
        [refCode, payload.reference_number, payload.notes, userId, orderId]
      );

      if (updated.rowCount === 0) throw new Error("409 Conflict");
    });
  }

  /**
   * Handles simple state transitions (draft, confirmed, cancelled).
   */
  async transitionStatus(orderId, companyId, userId, targetState) {
    return db.transaction(async (tx) => {
      const order = await tx.selectOne(
        "SELECT id, franchise_workflow_state FROM stock_orders WHERE id = ? AND company_id = ? FOR UPDATE",
        [orderId, companyId]
      );

      // Logic to validate state machine transitions goes here
      await tx.execute(
        "UPDATE stock_orders SET franchise_workflow_state = ?, updater_id = ?, updated_at = NOW() WHERE id = ?",
        [targetState, userId, orderId]
      );
    });
  }
}