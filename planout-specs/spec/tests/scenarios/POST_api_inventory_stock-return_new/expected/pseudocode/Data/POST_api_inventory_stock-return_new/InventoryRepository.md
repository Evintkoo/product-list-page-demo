/**
 * Data access layer for verifying InventoryItem existence.
 */
class InventoryRepository {

  /**
   * Validates if the inventory item exists in the system.
   * Used to return 404 Not Found if the item is missing.
   */
  async exists(inventoryItemId: string): Promise<boolean> {
    const item = await db.InventoryItem.findUnique({
      where: { id: inventoryItemId }
    });
    return !!item;
  }
}