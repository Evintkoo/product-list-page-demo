function renderSalesOrderReturnPage(data: SalesOrderReturn) {
    // Header Panel Mapping
    mapField(data.ref_code, "Document Number");
    mapField(data.sales_order_id, "Sales Order"); <!-- MISSING_FIELD: SalesOrder.ref_code -->
    mapField(data.sales_invoice_id, "Invoice"); <!-- MISSING_FIELD: SalesInvoice.ref_code -->
    mapField(data.created_at, "Created Date");
    mapField(data.received_at, "Received Date");
    mapField(data.approved_at, "Approved Date");
    mapField(data.customer_id, "From Customer"); <!-- MISSING_FIELD: Customer.name -->
    mapField(data.warehouse_id, "To Warehouse"); <!-- MISSING_FIELD: Warehouse.name -->
    mapField(data.created_by, "Created By");
    mapField(data.updated_by, "Updated By");
    mapField(data.notes, "Notes");
    mapField(data.updated_at, "Updated At");
    mapField(data.journal_id, "Journal"); <!-- MISSING_FIELD: Journal.ref_code -->

    // Amount Panel
    mapField(data.subtotal, "SubTotal");
    mapField(data.discount, "Discount");
    mapField(data.invoice_credit_note, "Invoice Credit Note");
    mapField(data.net_subtotal, "Net Subtotal");
    mapField(data.tax, "Tax");
    mapField(data.total, "Total");

    // Payments Panel
    mapField(data.allocated_credit_amount, "Allocated Credit Amount");

    // Order Items Table
    data.items.forEach(item => {
        renderRow({
            sku: item.sku,
            product: item.product_name,
            stock: item.available_quantity,
            returnQty: item.quantity,
            originalPrice: item.original_price,
            discount: item.discount_rate,
            unitPrice: item.unit_price,
            reason: item.reason
        });
    });
}