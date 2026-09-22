/**
 * Controller logic to bridge the UI component and the data layer.
 * Ensures that the mapping of product_id and counted_qty adheres to 
 * the Stock Opname Item JSON Schema.
 */

export const validateAndMapStockItem = (rawInput: any) => {
  // Ensure product_id is a string and counted_qty is a valid number
  const mappedData = {
    product_id: String(rawInput.product_id),
    counted_qty: Number(rawInput.counted_qty)
  };

  // Logic to verify against schema constraints
  if (isNaN(mappedData.counted_qty)) {
    throw new Error("counted_qty must be a valid number"); <!-- MISSING_FIELD: STOCK_OPNAME_ITEM.counted_qty -->
  }

  return mappedData;
};