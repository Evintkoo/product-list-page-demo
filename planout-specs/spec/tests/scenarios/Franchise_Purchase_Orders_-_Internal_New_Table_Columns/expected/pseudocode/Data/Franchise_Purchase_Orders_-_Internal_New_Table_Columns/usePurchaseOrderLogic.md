HOOK usePurchaseOrderLogic:
    // API Signature for saving the table state
    FUNCTION savePurchaseOrder(orderId: UUID, items: Array<FranchisePurchaseOrderItem>):
        POST "/api/franchise/purchase-orders/{orderId}/items"
        BODY: {
            items: items.map(item => ({
                product_id: item.product_id,
                store_qty: item.store_qty,
                order_qty: item.order_qty,
                store_remark: item.store_remark
            }))
        }
        RETURN response

    FUNCTION fetchSupplyPrice(productId: UUID):
        GET "/api/products/{productId}/supply-price"
        RETURN decimal_price