// Orchestrates data flow for the Stock Order Details Page

ON PAGE_LOAD(orderId):
    IF AUTHENTICATED:
        // Initialize view with Warehouse tab
        SET activeTab = "Warehouse"
        
        // Fetch header and items concurrently
        headerData = CALL getStockOrderById(orderId)
        itemsData = CALL getStockOrderItems(orderId, 1, 20)
        
        // Map items for display
        displayItems = itemsData.map(mapStockOrderItemToTable)
        RENDER_VIEW(headerData, displayItems)

ON CONFIRM_CLICK(orderId):
    // Trigger workflow advancement
    response = CALL confirmStockOrder(orderId)
    UPDATE_UI_STATE(response.status)

ON CANCEL_CLICK(orderId):
    // Trigger cancellation and revert state
    response = CALL cancelStockOrder(orderId)
    UPDATE_UI_STATE("Cancelled")
    REFRESH_VIEW_DATA(orderId)