/**
 * Logic for initializing the Sales Delivery Details Page.
 */
async function onPageLoad(recordId: string) {
    // 1. Authentication Check
    const userSession = await fetch("/auth/me");
    if (!userSession.ok) {
        redirectTo("/login");
        return;
    }

    // 2. Fetch Delivery Data
    const response = await fetch(`/sales-deliveries/${recordId}`);
    if (!response.ok) {
        handleError(response);
        return;
    }

    const deliveryData = await response.json();

    // 3. Map data to UI components
    renderSalesDeliveryPage(deliveryData);
}

/**
 * Maps the SalesDelivery entity and its lines to the UI components.
 */
function renderSalesDeliveryPage(data: SalesDelivery) {
    // Header Mapping
    updateUI("Document Number", data.ref_code);
    updateUI("Purchase Order No", data.customer_po_number);
    updateUI("Sales Order", { id: data.sales_order_id, ref: data.sales_order_ref_code }); <!-- MISSING_FIELD: SalesDelivery.sales_order_ref_code -->
    updateUI("Sales Invoice", { id: data.sales_invoice_id, ref: data.sales_invoice_ref_code }); <!-- MISSING_FIELD: SalesDelivery.sales_invoice_ref_code -->
    
    updateUI("From Warehouse", { 
        id: data.warehouse_id, 
        name: data.warehouse_name, <!-- MISSING_FIELD: Warehouse.name -->
        address: data.warehouse_address <!-- MISSING_FIELD: Warehouse.address -->
    });
    
    updateUI("To Customer", { 
        id: data.customer_id, 
        name: data.customer_name, <!-- MISSING_FIELD: Customer.name -->
        address: data.customer_address <!-- MISSING_FIELD: Customer.address -->
    });

    updateUI("Notes", data.notes);
    updateUI("Created By", data.created_by);
    updateUI("Updated By", data.updated_by);
    updateUI("Created At", data.created_at);
    updateUI("Updated At", data.updated_at);
    updateUI("Delivered Date", data.delivered_at);
    updateUI("Journal", { id: data.journal_id, ref: data.journal_ref_code }); <!-- MISSING_FIELD: Journal.journal_ref_code -->
    
    // Workflow Status Bar
    updateWorkflowStatusBar(data.workflow_state);

    // Delivery Items Table
    const tableRows = data.lines.map(line => ({
        sku: line.sku,
        productName: line.product_name,
        productCode: line.product_code,
        availableQuantity: line.available_quantity,
        quantity: line.quantity,
        unitPrice: line.unit_price,
        discount: line.discount_rate,
        amount: line.subtotal
    }));
    renderTable("Delivery Items", tableRows);

    // Totals
    updateUI("Subtotal", data.subtotal);
    updateUI("Tax", data.tax);
    updateUI("Total", data.total);
}

function updateWorkflowStatusBar(state: string) {
    // Logic: Draft shows [Deliver, Cancel], Delivered shows [Create Invoice]
    setUIState("workflow_bar", state);
    if (state === "draft") {
        showActions(["Deliver", "Cancel"]);
    } else if (state === "delivered") {
        showActions(["Create Invoice"]);
    }
}