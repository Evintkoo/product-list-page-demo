// Transactional wrapper to ensure atomicity
function createSalesOrderReturn(data: {
  companyId: UUID,
  warehouseId: UUID,
  customerId: UUID,
  salesInvoiceId: UUID,
  notes: string | null,
  items: Array<{ salesInvoiceItemId: UUID, quantity: decimal }>
}) {
  return db.transaction(async (tx) => {
    // 1. Generate unique return number
    const returnNumber = generateSequence("RETURN_SEQ");

    // 2. Create Header
    const returnHeader = await tx.insert("SalesOrderReturn", {
      company_id: data.companyId,
      return_number: returnNumber,
      warehouse_id: data.warehouseId,
      customer_id: data.customerId,
      sales_invoice_id: data.salesInvoiceId,
      status: "draft",
      notes: data.notes
    });

    // 3. Create Items
    for (const item of data.items) {
      await tx.insert("SalesOrderReturnItem", {
        sales_order_return_id: returnHeader.id,
        sales_invoice_item_id: item.salesInvoiceItemId,
        quantity: item.quantity
      });
    }

    return returnHeader;
  });
}