/**
 * Fetches the complete aggregate for a Sales Invoice.
 * Ensures the invoice belongs to the authenticated company scope.
 */
function getSalesInvoiceDetail(invoiceId: uuid, companyId: uuid) {
  const invoice = db.SalesInvoice.findFirst({
    where: {
      id: invoiceId,
      company_id: companyId
    },
    include: {
      salesOrder: true,
      customer: true,
      items: {
        select: {
          id: true,
          invoiced_quantity: true,
          returned_quantity: true,
          remaining_quantity: true
        }
      }
    }
  });

  if (!invoice) {
    throw new Error("NOT_FOUND");
  }

  return invoice;
}