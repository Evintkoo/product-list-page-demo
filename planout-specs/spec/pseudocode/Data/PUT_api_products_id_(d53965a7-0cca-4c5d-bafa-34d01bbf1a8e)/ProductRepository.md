/**
 * Node: [814dbed4-f1fc-4141-a09f-a509da2f9705]
 * Trigger: Logic layer signals 404 Not Found via "PUT /api/products/:id" (2a84af56-a6ea-4668-82ca-142bc06f152c)
 * Interface: Receives { id: UUID } from Logic layer.
 */

export const handleProductNotFound = async (productId: string): Promise<void> => {
  // Happy Path: Verify existence in database to confirm 404
  const product = await db.product.findUnique({
    where: { id: productId }
  });

  if (!product) {
    // Side Effect: Log the missing resource attempt for audit purposes
    logger.warn(`Update attempt failed: Product ${productId} not found.`);
    
    // Logic layer consumes this state to return 404 Not Found
    return;
  }
  
  // Validation/Error: If product exists, this branch should not have been triggered.
  throw new Error("Logic Error: 404 branch triggered for existing product.");
};

// Notes covered:
// - 404 Not Found - product with given id does not exist (from description)