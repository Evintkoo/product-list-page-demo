/**
 * Fetches the list of Franchise Purchase Orders based on current UI state.
 * @param params - Object containing filters, pagination, and sorting criteria.
 */
FUNCTION fetchFranchisePurchaseOrders(params):
    // Construct query string from params
    // Call GET /api/franchise-purchase-orders
    // Return response data
END FUNCTION

/**
 * Maps raw FranchisePurchaseOrder entities to the UI table row format.
 * Applies formatting rules for status badges and monetary values.
 */
FUNCTION mapToTableRow(order):
    RETURN {
        "Document Number": order.ref_code,
        "Reference No": order.supplier_ref_code,
        "Created At": FORMAT_DATE(order.created_at),
        "Due At": FORMAT_DATE(order.due_at),
        "Received At": order.received_at ? FORMAT_DATE(order.received_at) : "-",
        "Store": order.store_name,
        "Supplier": order.supplier_name,
        "Warehouse": order.warehouse_name,
        "Status": formatStatusBadge(order.workflow_state),
        "Order Amount": FORMAT_CURRENCY(order.order_amount),
        "Receive Amount": FORMAT_CURRENCY(order.receive_amount),
        "User": order.updater_name
    }
END FUNCTION

/**
 * Logic for status badge display labels.
 */
FUNCTION formatStatusBadge(state):
    SWITCH state:
        CASE "placed": RETURN { label: "Ordered", style: "primary" }
        CASE "received_partial": RETURN { label: "Partially Received", style: "warning" }
        DEFAULT: RETURN { label: CAPITALIZE(state), style: "default" }
    END SWITCH
END FUNCTION