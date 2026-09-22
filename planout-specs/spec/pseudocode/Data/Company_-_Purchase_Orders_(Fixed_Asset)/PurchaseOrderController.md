/**
 * API Endpoint handler for the Fixed Asset Purchase Order browse/search view.
 */
ENDPOINT GET /api/purchase-orders/fixed-assets:
    TRY:
        SET orders = PurchaseOrderRepository.getFixedAssetPurchaseOrders()
        RETURN HTTP_200_OK(orders)
    CATCH error:
        RETURN HTTP_500_INTERNAL_SERVER_ERROR("Failed to retrieve fixed asset purchase orders")