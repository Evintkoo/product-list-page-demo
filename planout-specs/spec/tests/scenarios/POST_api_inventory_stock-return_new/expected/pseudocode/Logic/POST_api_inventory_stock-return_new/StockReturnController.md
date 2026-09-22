FUNCTION handleCreateStockReturn(request, response):
    // 1. Authentication & Authorization
    IF NOT request.user:
        RETURN response.status(401).send("Unauthorized")
    
    IF NOT userHasPermission(request.user, "CREATE_STOCK_RETURN"):
        RETURN response.status(403).send("Forbidden")

    // 2. Validate Input
    SET data = request.body
    IF NOT data.inventory_item_id OR NOT data.quantity OR data.quantity <= 0:
        RETURN response.status(400).send("Malformed payload or invalid quantity")

    // 3. Verify Inventory Item Existence
    SET item = DB.InventoryItem.findUnique(id = data.inventory_item_id)
    IF NOT item:
        RETURN response.status(404).send("Inventory item not found")

    // 4. Check for existing return (Conflict check)
    SET existingReturn = DB.StockReturn.findFirst(inventory_item_id = data.inventory_item_id)
    IF existingReturn:
        RETURN response.status(409).send("A return already exists for this item")

    // 5. Create Record
    TRY:
        SET newReturn = DB.StockReturn.create({
            id: generateUUID(),
            inventory_item_id: data.inventory_item_id,
            quantity: data.quantity,
            reason: data.reason,
            status: "draft", // Default workflow state
            created_at: getCurrentTimestamp(),
            created_by: request.user.id
        })
        
        RETURN response.status(201).json(newReturn)
    CATCH error:
        RETURN response.status(500).send("Internal Server Error")