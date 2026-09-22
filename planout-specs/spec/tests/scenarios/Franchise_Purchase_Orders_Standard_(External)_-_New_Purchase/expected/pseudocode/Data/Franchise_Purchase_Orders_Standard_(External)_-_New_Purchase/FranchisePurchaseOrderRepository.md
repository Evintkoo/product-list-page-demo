/**
 * Handles persistence for External Franchise Purchase Orders.
 * Logic ensures atomic creation of the StockOrder header and its associated items.
 */

FUNCTION createExternalPurchaseOrder(requestData):
    // 1. Validate required fields
    ASSERT requestData.to_store_id IS NOT NULL
    ASSERT requestData.supplier_id IS NOT NULL
    ASSERT requestData.items IS NOT EMPTY
    
    // 2. Validate business rules
    FOR EACH item IN requestData.items:
        ASSERT item.order_qty > 0
    ASSERT unique(requestData.items.product_id) // No duplicate products
    
    // 3. Begin Transaction
    START TRANSACTION
    
    // 4. Create Header
    NEW order = StockOrder.create({
        to_store_id: requestData.to_store_id,
        supplier_id: requestData.supplier_id,
        supplier_ref_code: requestData.supplier_ref_code,
        due_at: requestData.due_at,
        notes: requestData.notes,
        stock_order_type: "EXTERNAL_PURCHASE",
        workflow_state: "DRAFT",
        ref_code: generateUniqueRefCode()
    })
    
    // 5. Create Items and calculate server-side values
    FOR EACH item IN requestData.items:
        // Fetch current supply price and store inventory levels
        LET current_price = fetchSupplyPrice(item.product_id, order.supplier_id)
        LET current_store_qty = fetchStoreInventory(item.product_id, order.to_store_id)
        
        StockOrderItem.create({
            stock_order_id: order.id,
            product_id: item.product_id,
            order_qty: item.order_qty,
            store_qty: current_store_qty,
            supply_price: current_price,
            order_amount: item.order_qty * current_price,
            company_average_cost: fetchAverageCost(item.product_id)
        })
    
    COMMIT TRANSACTION
    
    RETURN order (including generated ref_code and calculated item totals)