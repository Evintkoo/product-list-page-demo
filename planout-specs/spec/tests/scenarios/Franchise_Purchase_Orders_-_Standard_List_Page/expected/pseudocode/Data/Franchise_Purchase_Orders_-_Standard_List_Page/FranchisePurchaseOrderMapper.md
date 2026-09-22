/**
 * Maps raw API response objects from GET /api/franchise-purchase-orders
 * to the internal FranchisePurchaseOrder schema for the Standard List Page.
 */
FUNCTION mapToFranchisePurchaseOrderRow(rawData):
    RETURN {
        documentNumber: rawData.ref_code,
        referenceNo: rawData.supplier_ref_code OR "",
        createdAt: rawData.created_at,
        dueAt: rawData.due_at,
        receivedAt: rawData.received_at OR NULL,
        store: rawData.store_name,
        supplier: rawData.supplier_name,
        warehouse: rawData.order_type == "external_standard" ? NULL : rawData.warehouse_name,
        status: rawData.workflow_state == "placed" ? "Ordered" : rawData.workflow_state,
        isPartial: rawData.received_partial,
        orderAmount: FORMAT_CURRENCY(rawData.order_amount),
        receiveAmount: FORMAT_CURRENCY(rawData.receive_amount),
        user: rawData.updater_name
    }

/**
 * Data transformation logic for the list page.
 * Filters for order_type 'external_standard' as per business requirements.
 */
FUNCTION processFranchisePurchaseOrders(apiResponse):
    filteredData = FILTER apiResponse.data WHERE order_type == "external_standard"
    RETURN MAP filteredData TO mapToFranchisePurchaseOrderRow