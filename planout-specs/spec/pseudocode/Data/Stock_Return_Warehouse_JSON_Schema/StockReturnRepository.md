/**
 * Data access layer for Stock Return Warehouse operations.
 * Handles mapping between the database schema and the API response shape.
 */

interface StockReturnQuery {
  /**
   * Fetches a complete stock return record including associated line items.
   * @param id - The UUID of the stock return record.
   */
  getStockReturnById(id: string): Promise<StockReturnWarehouseResponse | null>;
}

// Implementation logic:
// 1. Execute primary query on 'stock_return' table using the provided ID.
// 2. If record exists, execute secondary query on 'stock_return_item' table 
//    filtering by 'stock_return_id'.
// 3. Map the database rows to the 'StockReturnWarehouseResponse' JSON shape.
// 4. Ensure 'notes' and 'updated_at' handle null values gracefully.