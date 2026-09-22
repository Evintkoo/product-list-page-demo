export const fetchProductStocks = async (id, params) => {
  // GET /api/products/:id/stocks
  // Query params: store_id, name, store_code, show_stock, page
};

export const fetchStores = async () => {
  // GET /api/stores
};

export const updateProductStocks = async (id, body) => {
  // PATCH /api/products/:id/stocks
  // Body: { items: [...] }
};

// ORPHAN_FIELD: isDirty (Used for tracking local UI state changes before PATCH)
// ORPHAN_FIELD: No (Table index column)