// API CONTRACTS:
// GET /api/store-stock-histories
// GET /api/stores

export const fetchStockHistories = async (params) => {
  // Implementation calls GET /api/store-stock-histories with query params
  // Mapping: 
  // id -> ID
  // created_at -> Date
  // store_id -> Store (Lookup store_name from Store entity)
  // type -> Type
  // increasedQty/decreasedQty -> Qty Changed
  // notes -> Notes
  // createdBy -> Created By
  // totalQtyChanged -> All Qty Changed <!-- ORPHAN_FIELD: totalQtyChanged -->
};

export const fetchStores = async () => {
  // Implementation calls GET /api/stores
};