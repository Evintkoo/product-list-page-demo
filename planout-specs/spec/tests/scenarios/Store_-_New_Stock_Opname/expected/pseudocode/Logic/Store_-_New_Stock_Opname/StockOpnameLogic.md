/**
 * Handles initialization of the New Stock Opname page.
 * Validates session and fetches necessary dropdown data.
 */
async function initializeStockOpnamePage() {
  const user = await fetch("/api/auth/me");
  if (!user.authenticated) {
    redirectTo("/login");
    return;
  }

  // Fetch dropdown options for the form
  const formData = await fetch("/api/stock_takes/new");
  return formData;
}

/**
 * Processes the form submission for a new stock opname.
 * Performs server-side calculations for variance and adjustment.
 */
async function createStockOpname(payload) {
  // 1. Validate required fields
  if (!payload.store_id) throw new Error("Store is required");
  
  // 2. Process items and calculate server-side fields
  const processedItems = payload.items.map((item, index) => {
    if (!item.product_id) throw new Error("Product ID is required");
    if (item.counted_qty < 0) throw new Error("Counted quantity cannot be negative");

    // Fetch current system state for the product
    const systemData = getStoreStock(payload.store_id, item.product_id);
    
    const variance_qty = (item.counted_qty || 0) - systemData.quantity;
    const adjustment_amount = variance_qty * systemData.average_cost;

    return {
      ...item,
      line_no: index + 1,
      system_qty: systemData.quantity,
      average_cost: systemData.average_cost,
      variance_qty: variance_qty,
      adjustment_amount: adjustment_amount
    };
  });

  // 3. Submit to API
  const response = await fetch("/api/stock-opname", {
    method: "POST",
    body: {
      ...payload,
      items: processedItems
    }
  });

  if (response.status === 201) {
    redirectTo("/stock-opname/list");
  }
}

// Helper functions for internal logic
function getStoreStock(storeId, productId) {
  // Logic to query Store Stocks Table
  // <!-- MISSING_FIELD: StoreStocks.quantity -->
  // <!-- MISSING_FIELD: StoreStocks.average_cost -->
}