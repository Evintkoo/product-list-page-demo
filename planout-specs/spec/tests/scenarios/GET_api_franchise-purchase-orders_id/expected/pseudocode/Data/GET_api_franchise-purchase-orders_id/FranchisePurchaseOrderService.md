/**
 * Orchestrates the retrieval of the purchase order header.
 * Handles the business logic for existence checks and security scoping.
 */
function getFranchisePurchaseOrderDetails(id: UUID, authenticatedUser: User): FranchisePurchaseOrder {
  // Validate ID format
  if (!isValidUUID(id)) {
    throw new BadRequestError("Invalid purchase order ID format.");
  }

  // Fetch record scoped to the user's company
  const order = FranchisePurchaseOrderRepository.findById(id, authenticatedUser.company_id);

  // If not found, return 404 to prevent enumeration of other companies' data
  if (!order) {
    throw new NotFoundError("Franchise Purchase Order not found.");
  }

  return order;
}