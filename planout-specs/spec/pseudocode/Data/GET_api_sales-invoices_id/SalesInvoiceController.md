/**
 * Controller logic for GET /api/sales-invoices/:id
 */
async function handleGetSalesInvoice(req, res) {
  try {
    const { id } = req.params;
    const companyId = req.user.company_id;

    // 1. Validate Authentication
    if (!req.user) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    // 2. Fetch Data via Repository
    const invoiceData = await getSalesInvoiceDetail(id, companyId);

    // 3. Return 200 OK with aggregated data
    return res.status(200).json({
      header: {
        id: invoiceData.id,
        workflow_state: invoiceData.workflow_state,
        created_at: invoiceData.created_at
      },
      salesOrder: invoiceData.salesOrder,
      customer: invoiceData.customer,
      amountSummary: { total: invoiceData.total_amount },
      items: invoiceData.items
    });

  } catch (error) {
    if (error.message === "NOT_FOUND") {
      return res.status(404).send({ error: "Sales Invoice not found" });
    }
    
    // 4. Handle unexpected errors
    return res.status(500).send({ error: "Internal Server Error" });
  }
}