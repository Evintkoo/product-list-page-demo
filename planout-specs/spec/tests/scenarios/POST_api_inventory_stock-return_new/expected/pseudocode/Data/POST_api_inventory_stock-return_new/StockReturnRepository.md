/**
 * Data access layer for handling StockReturn persistence.
 */
class StockReturnRepository {
  
  /**
   * Checks if an active return request already exists for a specific inventory item.
   * Used to prevent duplicate return requests (409 Conflict).
   */
  async existsByInventoryItemId(inventoryItemId: string): Promise<boolean> {
    const count = await db.StockReturn.count({
      where: { 
        inventory_item_id: inventoryItemId,
        status: { not: 'completed' } 
      }
    });
    return count > 0;
  }

  /**
   * Persists a new stock return record with a default 'draft' status.
   */
  async create(data: { 
    inventory_item_id: string, 
    quantity: number, 
    reason: string,
    created_by: string 
  }): Promise<StockReturn> {
    return await db.StockReturn.create({
      data: {
        ...data,
        status: 'draft',
        created_at: new Date()
      }
    });
  }
}