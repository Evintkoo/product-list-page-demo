FUNCTION handleUpdateSupplier(request, response):
    // 1. Extract path parameter
    SET supplierId = request.params.id
    
    // 2. Extract authenticated user context
    SET currentCompanyId = request.user.company_id
    
    // 3. Validate request body (only allow editable fields)
    SET updateData = request.body
    IF updateData contains "company_id" OR "id" OR "creator_id" OR "created_at":
        RETURN response.status(400).json({ error: "Forbidden field update" })
    
    // 4. Invoke Service Layer
    TRY:
        SET updatedSupplier = SupplierService.update(supplierId, currentCompanyId, updateData)
        RETURN response.status(200).json(updatedSupplier)
    CATCH NotFoundError:
        RETURN response.status(404).json({ error: "Supplier not found" })
    CATCH ConflictError:
        RETURN response.status(409).json({ error: "Supplier code already exists" })
    CATCH Exception:
        RETURN response.status(500).json({ error: "Internal server error" })