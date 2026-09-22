/**
 * Fetches a single Sales Invoice with its associated items.
 * Joins with Sales Order and Customer data as needed.
 */
function getSalesInvoiceById(sales_invoice_id: UUID, company_id: UUID) {
  return db.query(`
    SELECT si.*, 
           json_agg(sii.*) as items
    FROM sales_invoice si
    LEFT JOIN sales_invoice_item sii ON si.sales_invoice_id = sii.sales_invoice_id
    WHERE si.sales_invoice_id = :sales_invoice_id 
      AND si.company_id = :company_id
    GROUP BY si.sales_invoice_id
  `);
}

/**
 * Creates a new Sales Invoice and its items within a transaction.
 * Links to source Sales Deliveries.
 */
function createSalesInvoice(data: SalesInvoiceCreateRequest, company_id: UUID, user_id: UUID) {
  return db.transaction(async (tx) => {
    // 1. Validate and lock source deliveries
    const deliveries = await tx.query(
      "SELECT * FROM sales_deliveries WHERE sales_delivery_id = ANY(:ids) AND company_id = :company_id FOR UPDATE",
      { ids: data.sales_delivery_ids, company_id }
    );

    // 2. Insert Header
    const invoice = await tx.insert("sales_invoice", {
      ...data,
      company_id,
      creator_id: user_id,
      updater_id: user_id,
      workflow_state: 'draft',
      closed: false
    });

    // 3. Insert Items
    await tx.insert("sales_invoice_item", mapDeliveriesToItems(deliveries, invoice.sales_invoice_id));

    // 4. Update Delivery status
    await tx.update("sales_deliveries", { sales_invoice_id: invoice.sales_invoice_id }, { sales_delivery_id: ANY(data.sales_delivery_ids) });
    
    return invoice;
  });
}