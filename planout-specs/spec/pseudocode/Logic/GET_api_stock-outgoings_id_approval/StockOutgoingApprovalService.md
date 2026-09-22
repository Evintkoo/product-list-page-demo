FUNCTION getStockOutgoingForApproval(outgoingId):
    // 1. Fetch the StockOutgoing record
    SET outgoing = READ StockOutgoing WHERE id = outgoingId
    
    IF outgoing IS NULL:
        THROW 404 "Stock Outgoing not found"

    // 2. Validate status (Must be 'confirmed' and not yet 'approved')
    // Assuming status values: 'draft', 'confirmed', 'approved'
    IF outgoing.status != 'confirmed':
        THROW 409 "Document must be in 'confirmed' status to be approved"

    // 3. Fetch all lines associated with this outgoing
    SET lines = READ StockOutgoingLine WHERE stock_outgoing_id = outgoing.id

    SET pricedLines = []

    FOR EACH line IN lines:
        // 4. Fetch current product cost
        SET product = READ Product WHERE id = line.product_id
        
        // 5. Fetch current quantity on hand at the source warehouse
        SET inventory = READ Inventory WHERE product_id = line.product_id 
                                       AND warehouse_id = outgoing.source_warehouse_id
        
        // 6. Construct the response object for the line
        APPEND {
            "id": line.id,
            "product_id": line.product_id,
            "quantity": line.quantity,
            "average_cost": product.current_average_cost, <!-- MISSING_FIELD: Product.current_average_cost -->
            "stock_qty": inventory.quantity_on_hand, <!-- MISSING_FIELD: Inventory.quantity_on_hand -->
            "coa_reversal_id": line.coa_id
        } TO pricedLines

    // 7. Return the structured document
    RETURN {
        "id": outgoing.id,
        "status": outgoing.status,
        "source_warehouse_id": outgoing.source_warehouse_id,
        "lines": pricedLines
    }