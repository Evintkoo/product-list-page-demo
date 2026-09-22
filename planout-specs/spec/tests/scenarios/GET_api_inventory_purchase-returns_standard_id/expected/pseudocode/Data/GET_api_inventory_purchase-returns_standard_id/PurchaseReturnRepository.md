/**
 * Fetches the complete aggregate for a Purchase Return Standard.
 * Joins related entities to satisfy the detail view requirements.
 */
function getPurchaseReturnStandardById(id: uuid, companyId: uuid) {
  const record = db.PurchaseReturnStandard.findFirst({
    where: {
      id: id,
      company_id: companyId
    },
    include: {
      purchaseOrder: true,
      purchaseDelivery: true,
      purchaseInvoice: true,
      warehouse: true,
      supplier: true,
      items: true,
      journalReferences: true
    }
  });

  if (!record) {
    throw new NotFoundError("Purchase Return Standard not found");
  }

  return record;
}