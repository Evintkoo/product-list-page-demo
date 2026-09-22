/**
 * Fetches the list of Purchase Orders specifically for Fixed Assets.
 * Filters the PurchaseOrder entity where is_fixed_asset is true.
 */
function fetchFixedAssetPurchaseOrders() {
    const queryParams = {
        is_fixed_asset: true
    };

    return API.get("/purchase-orders", { params: queryParams })
        .then(response => {
            return response.data.map(mapPurchaseOrderToUI);
        });
}

/**
 * Maps the backend PurchaseOrder entity fields to the UI table structure.
 */
function mapPurchaseOrderToUI(po) {
    return {
        id: po.id,
        documentNumber: po.ref_code,
        referenceNumber: po.supplier_ref_code,
        createdAt: po.created_at,
        dueDate: po.due_at,
        fromSupplier: po.supplier_name,
        status: po.workflow_state,
        amount: po.total,
        deliveries: po.delivery_count,
        invoices: po.invoices_count,
        returns: po.return_count
    };
}