/**
 * Logic to handle the initialization and rendering of the Sales Order Detail page.
 */
async function onPageLoad(orderId) {
    // 1. Authentication Check
    const session = await fetch("/api/auth/me");
    if (!session.ok) {
        return redirectTo("/login");
    }

    // 2. Fetch Sales Order Data
    const response = await fetch(`/api/sales-orders/${orderId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch sales order details");
    }
    
    const orderData = await response.json();

    // 3. Map data to UI components
    const viewModel = mapSalesOrderToView(orderData);

    // 4. Determine UI state based on status
    // Status determines visibility of action buttons:
    // - Draft: Show "Approve"
    // - Approved/Delivered: Show "Proforma Invoice"
    // - All: Show "Print"
    renderPage(viewModel, orderData.status);
}

/**
 * Maps raw API response to the UI structure defined in the feature requirements.
 */
function mapSalesOrderToView(data) {
    return {
        header: {
            documentNumber: data.ref_code,
            purchaseOrderNo: data.external_ref_code,
            warehouse: { id: data.warehouse_id, <!-- MISSING_FIELD: Warehouse.name --> },
            customer: { id: data.customer_id, <!-- MISSING_FIELD: Customer.name -->, address: data.delivery_address },
            notes: data.notes,
            salesperson: data.salesperson_name,
            source: data.source,
            dueDate: data.due_at,
            approvedDate: data.approved_at,
            createdBy: data.created_by,
            updatedBy: data.updated_by,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            isClosed: data.closed
        },
        items: data.items.map(item => ({
            sku: item.sku,
            productName: item.product_name,
            productCode: item.product_code,
            orderQty: item.order_qty,
            deliveredQty: item.delivered_qty,
            price: item.price,
            discount: item.discount_rate,
            amount: item.amount
        })),
        totals: {
            subtotal: data.subtotal,
            tax: data.tax,
            total: data.total
        }
    };
}