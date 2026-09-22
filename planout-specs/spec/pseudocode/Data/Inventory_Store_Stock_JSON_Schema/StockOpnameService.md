// Logic for handling Stock Opname lifecycle
function getStockOpnameList(params: StockOpnameListQueryParams, companyId: UUID) {
  // Executes query joining StockOpname, Store, and User
  // Returns paginated data matching StockOpnameListResponse
}

function getStockOpnameDetail(id: UUID, companyId: UUID) {
  // Fetches header from StockOpname table
  // Requires company_id, approved_at, and journal_ref_code columns
}

function getStockOpnameItems(id: UUID, companyId: UUID, params: StockOpnameItemListQueryParams) {
  // Fetches items from StockOpnameItem table joined with Product master data
}