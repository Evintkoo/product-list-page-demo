FUNCTION handleUpdateProduct(request, response):
    // 1. Authentication & Authorization
    IF NOT request.isAuthenticated():
        RETURN response.status(401).json({ error: "Unauthorized" })
    
    IF NOT request.user.hasPermission("UPDATE_PRODUCT"):
        RETURN response.status(403).json({ error: "Forbidden" })

    // 2. Fetch existing record
    existingProduct = DB.Product.findById(request.params.id)
    IF NOT existingProduct:
        RETURN response.status(404).json({ error: "Product not found" })

    // 3. Validate Input
    // Ensure SKU uniqueness if changed
    IF request.body.sku AND request.body.sku != existingProduct.sku:
        IF DB.Product.existsBySku(request.body.sku):
            RETURN response.status(400).json({ error: "SKU already in use" })

    // 4. Track changes for Audit Log
    fieldsToTrack = ["sku", "name", "description", "price", "stock_quantity", "is_active"]
    changes = []
    
    FOR field IN fieldsToTrack:
        IF request.body[field] IS NOT NULL AND request.body[field] != existingProduct[field]:
            changes.APPEND({
                field: field,
                old: existingProduct[field],
                new: request.body[field]
            })

    // 5. Perform Update
    TRY:
        DB.transaction(BEGIN):
            // Update Product
            updatedProduct = DB.Product.update(request.params.id, {
                sku: request.body.sku,
                name: request.body.name,
                description: request.body.description,
                price: request.body.price,
                stock_quantity: request.body.stock_quantity,
                is_active: request.body.is_active,
                updated_at: CURRENT_TIMESTAMP
            })

            // Write to AuditLog
            FOR change IN changes:
                DB.AuditLog.create({
                    product_id: request.params.id,
                    changed_field: change.field,
                    old_value: STRING(change.old),
                    new_value: STRING(change.new),
                    changed_at: CURRENT_TIMESTAMP
                })
        DB.transaction(COMMIT)
        
        RETURN response.status(200).json(updatedProduct)

    CATCH error:
        DB.transaction(ROLLBACK)
        RETURN response.status(500).json({ error: "Internal Server Error" })