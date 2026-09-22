/**
 * Maps the raw API response to the UI-friendly format required by the Sales Invoice table.
 * Note: Some fields in the UI mapping (e.g., PO Number) are not in the core schema 
 * and are treated as extended metadata.
 */
function mapToTableFormat(response: SalesInvoiceListResponse) {
    return {
        invoices: response.data.map(invoice => ({
            invoiceNumber: invoice.invoice_number,
            customerName: invoice.customer_name,
            issueDate: invoice.issue_date,
            dueDate: invoice.due_date,
            totalAmount: invoice.total_amount,
            status: invoice.status,
            // <!-- MISSING_FIELD: SalesInvoice.customer_po_number -->
            // <!-- MISSING_FIELD: SalesInvoice.sales_order_ref_code -->
            // <!-- MISSING_FIELD: SalesInvoice.created_at -->
        })),
        pagination: {
            totalCount: response.total_count,
            currentPage: response.page,
            pageSize: response.page_size
        }
    };
}