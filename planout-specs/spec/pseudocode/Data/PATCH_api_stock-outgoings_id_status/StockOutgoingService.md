/**
 * Validates state transition logic for Stock Outgoing
 */
function validateTransition(currentStatus: string, nextStatus: string): boolean {
  const allowed = {
    "draft": ["confirmed", "cancelled"],
    "confirmed": ["cancelled"],
    "cancelled": ["draft"]
  };
  
  return allowed[currentStatus]?.includes(nextStatus) ?? false;
}

/**
 * Checks if stock is sufficient for all lines in the outgoing
 * Returns { valid: boolean, errors: Array<{ product_name: string, quantity_on_hand: decimal }> }
 */
async function checkStockAvailability(outgoingId: uuid): Promise<{ valid: boolean, errors: any[] }> {
  const lines = db.StockOutgoingLine.findMany({ where: { stock_outgoing_id: outgoingId } });
  const errors = [];

  for (const line of lines) {
    const product = db.Product.findById(line.product_id);
    if (product.quantity_on_hand < line.quantity) {
      errors.push({ product_name: product.name, quantity_on_hand: product.quantity_on_hand });
    }
  }

  return { valid: errors.length === 0, errors };
}