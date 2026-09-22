/**
 * Logic for fetching a single Sales Invoice with related entities.
 * Scope: Authenticated company context.
 */
function getSalesInvoiceById(request, response) {
    const { id } = request.params;
    const { company_id } = request.user; // Derived from session/auth context

    // 1. Fetch the primary SalesInvoice record
    const invoice = database.SalesInvoice.findOne({
        where: { 
            id: id,
            company_id: company_id 
        }
    });

    if (!invoice) {
        return response.status(404).json({ error: "Sales Invoice not found" });
    }

    // 2. Fetch related entities
    const salesOrder = database.SalesOrder.findOne({
        where: { id: invoice.sales_order_id }
    });

    const customer = database.Customer.findOne({
        where: { id: invoice.customer_id }
    });

    const invoiceItems = database.SalesInvoiceItem.findAll({
        where: { sales_invoice_id: invoice.id }
    });

    // 3. Construct the response payload
    const payload = {
        id: invoice.id,
        company_id: invoice.company_id,
        sales_order_id: invoice.sales_order_id,
        customer_id: invoice.customer_id,
        workflow_state: invoice.workflow_state,
        total_amount: invoice.total_amount,
        created_at: invoice.created_at,
        
        // Flattened related data
        sales_order_number: salesOrder?.order_number, <!-- MISSING_FIELD: SalesOrder.order_number -->
        customer_name: customer?.name,
        
        // Items include quantity metrics for the Return page logic
        items: invoiceItems.map(item => ({
            id: item.id,
            invoiced_quantity: item.invoiced_quantity,
            returned_quantity: item.returned_quantity,
            remaining_quantity: item.remaining_quantity
        }))
    };

    return response.status(200).json(payload);
}