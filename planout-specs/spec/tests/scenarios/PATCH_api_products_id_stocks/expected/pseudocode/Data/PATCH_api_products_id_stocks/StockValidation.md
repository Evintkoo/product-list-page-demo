/**
 * Validates the incoming request body for stock threshold updates.
 */
function validateStockUpdatePayload(items: any[]) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new BadRequestError("Items array is required and cannot be empty");
  }

  for (const item of items) {
    // Check for non-negative integers
    if (item.min_qty < 0 || item.max_qty < 0) {
      throw new UnprocessableEntityError("Stock levels must be non-negative");
    }

    // Check business logic: min cannot exceed max
    if (item.min_qty > item.max_qty) {
      throw new UnprocessableEntityError("min_qty cannot be greater than max_qty");
    }
  }
}