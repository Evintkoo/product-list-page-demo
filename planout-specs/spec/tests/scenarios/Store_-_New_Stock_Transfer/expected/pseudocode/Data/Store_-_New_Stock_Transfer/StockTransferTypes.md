/**
 * Shape for the POST /api/stock-transfers request body
 */
interface StockTransferCreateRequest {
  source_location_id: uuid;
  destination_location_id: uuid;
  transfer_date: datetime;
  reference_number: string;
  notes: string;
  items: Array<{
    product_id: uuid;
    transferred_qty: decimal;
  }>;
}

/**
 * Shape for the 201 Created response from /api/stock-transfers
 */
interface StockTransferDetailResponse {
  id: uuid;
  source_location_id: uuid;
  destination_location_id: uuid;
  status: "Draft" | "Completed" | "Cancelled";
  created_at: datetime;
  items: Array<{
    id: uuid;
    product_id: uuid;
    transferred_qty: decimal;
    snapshot_cost: decimal;
  }>;
}