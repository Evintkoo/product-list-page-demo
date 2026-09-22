/**
 * Defines the shape of the data returned by the API for the Stock Transfer List.
 * This structure is used by the frontend to populate the table rows and pagination.
 */
interface StockTransferListResponse {
  data: Array<{
    stock_transfer_id: uuid;
    ref_code: string;
    transfer_type: string;
    created_at: datetime;
    due_at: datetime;
    from_location_name: string;
    to_location_name: string;
    workflow_state: string;
    user_name: string;
  }>;
  pagination: {
    total_pages: number;
    current_page: number;
    page_size: number;
  };
}

/**
 * Fetches the paginated list of stock transfers.
 * @param page The page number to retrieve.
 * @param search Optional search query to filter by ref_code or location.
 * @returns Promise<StockTransferListResponse>
 */
async function getStockTransferList(page: number, search?: string): Promise<StockTransferListResponse> {
  // Logic:
  // 1. Construct query parameters from page and search inputs.
  // 2. Execute GET request to /api/inventory/stock-transfers.
  // 3. If response data is empty, return an object with an empty array and valid pagination metadata.
  // 4. Map backend entities (StockTransfer, Location, User) into the flattened response shape.
}

/**
 * Data Mapping Logic:
 * The backend service layer performs the join between StockTransfer, Location, and User
 * to provide the denormalized fields (from_location_name, to_location_name, user_name)
 * required by the UI table.
 */