// Logic for handling Stock Order lifecycle and data retrieval
function getStockOrderList(params: StockOrderListQueryParams, companyId: UUID) {
  // Executes query joining StockOrder, Warehouse, Store, User, and lateral joins for Service/Work Orders
  // Returns paginated data matching StockOrderListResponse
}

function getStockOrderDetail(id: UUID, companyId: UUID) {
  // Fetches header from StockOrder table with joined display names
}

function getStockOrderItems(id: UUID, companyId: UUID, params: StockOrderItemListQueryParams) {
  // Fetches items from StockOrderItem table, joined with Product master data
  // Calculates total_order_qty via subquery
}