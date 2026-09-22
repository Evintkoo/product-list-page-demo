/**
 * Logic for persisting the Stock Transfer
 */
function createStockTransfer(data: StockTransferCreateRequest): StockTransferDetailResponse {
  // 1. Validate business rules:
  //    - Ensure source_location_id != destination_location_id
  //    - Ensure items array is not empty
  //    - Ensure all transferred_qty > 0
  
  // 2. Begin Database Transaction
  //    - Insert into StockTransfer table with status 'Draft'
  //    - For each item in data.items:
  //        - Fetch current product cost
  //        - Insert into StockTransferItem with snapshot_cost
  
  // 3. Commit Transaction
  
  // 4. Return the fully populated StockTransferDetailResponse
}