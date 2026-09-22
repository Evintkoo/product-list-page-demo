FUNCTION patchStockOutgoing(id, requestBody):
    // 1. Fetch existing document
    document = DB.StockOutgoing.find(id)
    IF NOT document: RETURN 404
    
    // 2. Validate state
    IF document.status != 'DRAFT': RETURN 409
    
    // 3. Transactional update
    START TRANSACTION
        // Update header (excluding ref_code)
        document.update(requestBody.header_fields)
        
        // Process lines
        FOR EACH line_item IN requestBody.lines:
            IF line_item._destroy:
                DB.StockOutgoingLine.delete(line_item.id)
            ELSE IF line_item.id:
                DB.StockOutgoingLine.update(line_item.id, line_item)
            ELSE:
                DB.StockOutgoingLine.create(line_item)
        
        // 4. Validation & Pricing
        lines = DB.StockOutgoingLine.findByOutgoingId(id)
        IF lines.isEmpty(): RETURN 422
        
        FOR EACH line IN lines:
            // Check product existence
            product = DB.Product.find(line.product_id)
            IF NOT product OR line.quantity <= 0: RETURN 422
            
            // Check stock availability at source
            inventory = DB.Inventory.find(document.source_id, line.product_id)
            IF inventory.quantity < line.quantity: RETURN 422
            
            // Set pricing from current source cost
            line.unit_cost = inventory.average_cost
            line.save()
            
    COMMIT TRANSACTION
    
    RETURN 200, serialize(document, lines)