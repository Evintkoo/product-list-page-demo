/**
 * Logic for handling the Stock Return Table row state and data mapping.
 * This handles the interaction between the Product search and the StockReturnItem schema.
 */

// 1. Product Search Logic
// Triggered when user types >= 3 characters in the Search Product Input
async function handleProductSearch(query: string) {
  if (query.length < 3) return [];

  // Calls GET /products with query parameter
  const results = await api.get("/products", { params: { search: query } });
  
  return results.map(product => ({
    label: product.name,
    value: product.id,
    current_stock: product.current_stock
  }));
}

// 2. Mapping Values for StockReturnItem
// This function aggregates the state from the table row inputs
function mapStockReturnItem(formData: {
  product_id: string,
  store_qty: number,
  return_qty: number,
  type: string,
  reason: string
}): StockReturnItem {
  
  // Mapping to StockReturnItem schema
  return {
    product_id: formData.product_id,
    store_qty: formData.store_qty,
    return_qty: formData.return_qty,
    type: formData.type, // Expected: "Return" or "Claim"
    reason: formData.reason
  };
}

// 3. State Management for Table Row
// When a product is selected from the dropdown:
function onProductSelected(selectedProduct: Product) {
  // Update local row state
  updateRowState({
    product_id: selectedProduct.id,
    store_qty: selectedProduct.current_stock
  });
}

// 4. Validation Logic
function validateRow(item: StockReturnItem) {
  const errors = [];
  if (!item.product_id) errors.push("Product is required");
  if (item.return_qty <= 0) errors.push("Return quantity must be greater than 0");
  if (!item.type) errors.push("Type is required");
  if (!item.reason || item.reason.trim() === "") errors.push("Reason is required");
  
  return {
    isValid: errors.length === 0,
    errors
  };
}