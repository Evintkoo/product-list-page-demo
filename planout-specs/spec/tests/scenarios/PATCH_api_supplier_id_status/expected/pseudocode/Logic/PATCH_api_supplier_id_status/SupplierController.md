FUNCTION handleUpdateSupplierStatus(request, response):
    // 1. Extract parameters
    SET supplierId = request.params.id
    SET newStatus = request.body.is_active
    SET currentCompanyId = request.user.company_id <!-- MISSING_FIELD: User.company_id -->

    // 2. Validate input
    IF supplierId IS NULL OR newStatus IS NOT BOOLEAN:
        RETURN response.status(400).json({ error: "Invalid request parameters" })

    // 3. Fetch and verify supplier existence and ownership
    SET supplier = DATABASE.Supplier.findOne({ id: supplierId })
    
    IF supplier IS NULL:
        RETURN response.status(404).json({ error: "Supplier not found" })
    
    IF supplier.company_id != currentCompanyId:
        RETURN response.status(404).json({ error: "Supplier not found" })

    // 4. Perform update
    TRY:
        SET updatedSupplier = DATABASE.Supplier.update(
            { id: supplierId },
            { 
                is_active: newStatus,
                updated_at: CURRENT_TIMESTAMP
            }
        )
        
        RETURN response.status(200).json({
            id: updatedSupplier.id,
            is_active: updatedSupplier.is_active,
            updated_at: updatedSupplier.updated_at
        })
        
    CATCH error:
        RETURN response.status(500).json({ error: "Internal server error" })