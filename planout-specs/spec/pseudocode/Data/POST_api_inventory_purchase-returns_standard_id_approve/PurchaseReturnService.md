/**
 * Orchestrates the approval logic, including state validation.
 */
function handleApproveCommand(id: uuid, payload: ApproveRequest, userId: uuid) {
  const record = PurchaseReturnRepository.findById(id, currentCompanyId);

  // 404: Record not found
  if (!record) throw new NotFoundError("Purchase Return not found");

  // 409: State validation
  if (record.workflow_state !== "Sent to Supplier") {
    throw new ConflictError("Purchase Return must be in 'Sent to Supplier' state");
  }

  // 422: Business logic validation for quantities
  validateQuantities(payload.items);

  // Execute update
  return PurchaseReturnRepository.approvePurchaseReturn(
    id, 
    payload.items, 
    payload.notes, 
    userId
  );
}