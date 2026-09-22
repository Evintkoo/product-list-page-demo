FUNCTION updateStockOutgoing(id, payload):
    // 1. Fetch existing record
    SET outgoing = READ StockOutgoing WHERE id = id
    IF outgoing IS NULL:
        RETURN 404 "Stock Outgoing not found"

    // 2. Validate status
    IF outgoing.status != "draft":
        RETURN 409 "Only draft stock outgoings can be updated"

    // 3. Update Header
    IF payload.source_id IS PROVIDED:
        SET outgoing.source_id = payload.source_id
    
    // 4. Process Lines
    FOR EACH line_item IN payload.lines:
        IF line_item._destroy IS TRUE:
            DELETE StockOutgoingLine WHERE id = line_item.id
            CONTINUE

        IF line_item.id IS PROVIDED:
            // Update existing line
            SET line = READ StockOutgoingLine WHERE id = line_item.id
            SET line.product_id = line_item.product_id
            SET line.quantity = line_item.quantity
        ELSE:
            // Create new line
            SET line = NEW StockOutgoingLine
            SET line.stock_outgoing_id = outgoing.id
            SET line.product_id = line_item.product_id
            SET line.quantity = line_item.quantity

        // 5. Pricing and Validation
        // Fetch current inventory to validate stock and get cost
        SET inventory = READ Inventory WHERE product_id = line.product_id AND location_id = outgoing.source_id
        
        IF inventory IS NULL OR inventory.quantity < line.quantity:
            RETURN 422 "Insufficient stock for product: " + line.product_id
        
        IF line.quantity <= 0:
            RETURN 422 "Quantity must be greater than zero"

        // Set unit_cost from current average_cost in inventory
        SET line.unit_cost = inventory.average_cost
        SAVE line

    // 6. Finalize
    SAVE outgoing
    RETURN 200 outgoing