/**
 * Transforms raw API response objects into the internal table row format.
 * 
 * @param rawData - The array of FranchisePurchaseOrder objects from the API.
 * @returns An array of formatted objects ready for the UI table component.
 */
function mapToTableRows(rawData) {
    return rawData.map(item => ({
        id: item.id,
        documentNumber: item.ref_code,
        referenceNo: item.supplier_ref_code,
        createdAt: item.created_at,
        dueAt: item.due_at,
        receivedAt: item.received_at,
        store: item.store_name,
        supplier: item.supplier_name,
        warehouse: item.warehouse_name,
        status: formatStatus(item.workflow_state),
        orderAmount: formatCurrency(item.order_amount),
        receiveAmount: formatCurrency(item.receive_amount),
        user: item.updater_name
    }));
}

function formatStatus(state) {
    // Maps internal workflow_state to UI display labels
    const statusMap = {
        'placed': 'Ordered',
        'received_partial': 'Received Partial'
    };
    return statusMap[state] || state;
}

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}