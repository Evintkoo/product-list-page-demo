FUNCTION update(supplierId, companyId, updateData):
    // 1. Verify existence and ownership
    SET supplier = Database.Supplier.findOne({ 
        id: supplierId, 
        company_id: companyId 
    })
    
    IF supplier IS NULL:
        THROW NotFoundError
        
    // 2. Check for unique constraint conflict if supplier_code is being updated
    IF updateData.supplier_code IS NOT NULL AND updateData.supplier_code != supplier.supplier_code:
        SET existing = Database.Supplier.findOne({ 
            supplier_code: updateData.supplier_code,
            company_id: companyId
        })
        IF existing IS NOT NULL:
            THROW ConflictError
            
    // 3. Perform update
    SET updatedSupplier = Database.Supplier.update(
        { id: supplierId },
        updateData
    )
    
    RETURN updatedSupplier