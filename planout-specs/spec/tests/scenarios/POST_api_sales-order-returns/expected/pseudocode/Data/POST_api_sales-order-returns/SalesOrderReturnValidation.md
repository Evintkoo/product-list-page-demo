function validateReturnRequest(companyId: UUID, request: SalesOrderReturnCreateRequest) {
  // Verify existence and ownership
  const warehouse = db.find("Warehouse", { id: request.warehouseId, company_id: companyId });
  if (!warehouse) throw new NotFoundError("Warehouse not found");

  const customer = db.find("Customer", { id: request.customerId, company_id: companyId });
  if (!customer) throw new NotFoundError("Customer not found");

  const invoice = db.find("SalesInvoice", { 
    id: request.salesInvoiceId, 
    company_id: companyId,
    customer_id: request.customerId 
  });
  if (!invoice) throw new NotFoundError("Sales Invoice not found");

  // Validate items
  if (request.items.length === 0) throw new BadRequestError("At least one item required");

  for (const item of request.items) {
    if (item.quantity <= 0) throw new BadRequestError("Quantity must be > 0");

    // Check returnable quantity (Invoice Item total - already returned)
    const returnedTotal = db.sum("SalesOrderReturnItem.quantity", { 
      sales_invoice_item_id: item.salesInvoiceItemId 
    });
    const invoiceItem = db.find("SalesInvoiceItem", { id: item.salesInvoiceItemId });
    
    if (!invoiceItem) throw new NotFoundError("Invoice item not found");
    if (item.quantity > (invoiceItem.quantity - returnedTotal)) {
      throw new ConflictError("Quantity exceeds remaining returnable amount");
    }
  }
}