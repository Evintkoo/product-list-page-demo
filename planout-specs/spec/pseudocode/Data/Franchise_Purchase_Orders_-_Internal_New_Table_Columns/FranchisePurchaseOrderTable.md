COMPONENT FranchisePurchaseOrderTable:
    STATE items: Array<FranchisePurchaseOrderItem> = []

    FUNCTION handleUpdateItem(index, field, value):
        // Updates the local state for the specific row
        SET items[index][field] = value

    RENDER:
        TABLE:
            HEADER: ["Product", "Store Qty", "Order Qty", "Supply Price", "Remark"]
            FOR EACH item, index IN items:
                ROW:
                    CELL: ProductSelector(value=item.product_id, onChange=(v) => handleUpdateItem(index, 'product_id', v))
                    CELL: InputNumber(value=item.store_qty, onChange=(v) => handleUpdateItem(index, 'store_qty', v))
                    CELL: InputNumber(value=item.order_qty, onChange=(v) => handleUpdateItem(index, 'order_qty', v))
                    CELL: DisplayCurrency(value=item.supply_price) // Read-only derived from product catalog
                    CELL: InputText(value=item.store_remark, onChange=(v) => handleUpdateItem(index, 'store_remark', v))