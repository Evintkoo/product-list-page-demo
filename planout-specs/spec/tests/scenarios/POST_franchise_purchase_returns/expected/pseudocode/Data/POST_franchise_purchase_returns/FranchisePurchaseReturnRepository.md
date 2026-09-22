/**
 * Handles persistence logic for franchise purchase returns.
 */
class FranchisePurchaseReturnRepository {
  
  /**
   * Creates a new stock return record and its associated items in a single transaction.
   * @param data The validated request payload.
   * @returns The created STOCK_RETURN record.
   */
  async createReturn(data) {
    return await database.transaction(async (tx) => {
      // 1. Verify existence of the source franchise purchase order
      const order = await tx.table('FRANCHISE_PURCHASE_ORDER')
        .where({ id: data.franchise_purchase_order })
        .first();
      
      if (!order) {
        throw new Error("NOT_FOUND: Franchise purchase order does not exist.");
      }

      // 2. Check for existing return to prevent duplicate processing (409 Conflict)
      const existing = await tx.table('STOCK_RETURN')
        .where({ franchise_purchase_order: data.franchise_purchase_order })
        .first();
      
      if (existing) {
        throw new Error("CONFLICT: A return already exists for this order.");
      }

      // 3. Validate return quantities against max_return_qty
      for (const item of data.items) {
        if (item.return_qty > item.max_return_qty) {
          throw new Error("BAD_REQUEST: return_qty exceeds max_return_qty for product " + item.product_id);
        }
      }

      // 4. Insert the header
      const [newReturn] = await tx.table('STOCK_RETURN').insert({
        type: 'franchise_external',
        return_from: data.return_from,
        return_to_supplier: data.return_to_supplier,
        franchise_purchase_order: data.franchise_purchase_order,
        document_no: data.document_no || generateDocumentNumber(),
        reference_no: data.reference_no,
        notes: data.notes,
        created_at: now()
      }).returning('*');

      // 5. Insert the items
      const itemsToInsert = data.items.map(item => ({
        stock_return_id: newReturn.id,
        product_id: item.product_id,
        return_qty: item.return_qty,
        reason: item.reason
      }));

      await tx.table('STOCK_RETURN_ITEM').insert(itemsToInsert);

      return newReturn;
    });
  }
}