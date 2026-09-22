/**
 * Orchestrates the UI interaction with the Data layer.
 */

ON_ACTION "Cancel Button Clicked" (orderId):
    CONFIRMATION_DIALOG("Are you sure you want to cancel this order?")
    IF confirmed:
        response = StockOrderService.cancelStockOrder(orderId)
        UPDATE_UI_STATE(response.status)
        REFRESH_DOCUMENT_VIEW()

ON_ACTION "Confirm Button Clicked" (orderId):
    response = StockOrderService.confirmStockOrder(orderId)
    IF response.status IS SUCCESS:
        UPDATE_UI_STATE(response.status)
        NOTIFY_USER("Order status updated successfully")
    ELSE:
        HANDLE_ERROR(response.message)