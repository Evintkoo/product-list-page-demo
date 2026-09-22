/**
 * Handles the creation of a new External Franchise Purchase Order.
 * Validates input, persists the StockOrder header, and creates associated StockOrderItems.
 */
FUNCTION createExternalPurchaseOrder(formData):
    // 1. Validation
    IF formData.to_store_id IS NULL OR formData.supplier_id IS NULL:
        THROW Error("Deliver To and From Supplier are required.")
    
    IF formData.items IS EMPTY:
        THROW Error("At least one product is required.")
        
    FOR EACH item IN formData.items:
        IF item.order_qty <= 0:
            THROW Error("Order quantity must be greater than 0.")
            
    IF hasDuplicates(formData.items, "product_id"):
        THROW Error("Duplicate products are not allowed.")

    // 2. Persistence
    // Create the StockOrder header
    newOrder = StockOrder.CREATE(
        to_store_id = formData.to_store_id,
        supplier_id = formData.supplier_id,
        supplier_ref_code = formData.supplier_ref_code,
        due_at = formData.due_at,
        notes = formData.notes,
        stock_order_type = "EXTERNAL", <!-- MISSING_FIELD: StockOrder.stock_order_type -->
        workflow_state = "DRAFT", <!-- MISSING_FIELD: StockOrder.workflow_state -->
        created_at = CURRENT_TIMESTAMP
    )

    // Create the StockOrderItems
    FOR EACH item IN formData.items:
        StockOrderItem.CREATE(
            stock_order_id = newOrder.id,
            product_id = item.product_id,
            order_qty = item.order_qty,
            supply_price = FETCH_CURRENT_SUPPLY_PRICE(item.product_id), <!-- MISSING_FIELD: StockOrderItem.supply_price -->
            company_average_cost = FETCH_AVG_COST(item.product_id) <!-- MISSING_FIELD: StockOrderItem.company_average_cost -->
        )

    // 3. Return response
    RETURN newOrder