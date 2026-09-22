/**
 * Data access layer for Product entity operations.
 * Handles persistence and audit logging for full updates.
 */

FUNCTION findProductById(id):
    RETURN DB.Product.findFirst({ where: { id: id } })

FUNCTION updateProduct(id, updateData):
    // Start transaction to ensure atomicity of update and audit log
    BEGIN TRANSACTION
    
    // Fetch current state for §2 change tracking
    currentProduct = findProductById(id)
    
    // Perform full update
    updatedProduct = DB.Product.update({
        where: { id: id },
        data: {
            name: updateData.name,
            description: updateData.description,
            price: updateData.price,
            stock_quantity: updateData.stock_quantity,
            is_active: updateData.is_active,
            updated_at: CURRENT_TIMESTAMP
        }
    })
    
    // §2: Guarded flag changes - Log changes if is_active status is toggled
    IF currentProduct.is_active != updatedProduct.is_active:
        DB.AuditLog.create({
            product_id: id,
            changed_field: "is_active",
            old_value: STRING(currentProduct.is_active),
            new_value: STRING(updatedProduct.is_active),
            changed_at: CURRENT_TIMESTAMP
        })
    END IF
    
    COMMIT TRANSACTION
    RETURN updatedProduct

FUNCTION handleDatabaseError(error):
    // Map database constraints to API response codes
    IF error IS ConstraintViolation:
        RETURN 400 // Bad Request
    ELSE:
        RETURN 500 // Internal Server Error
    END IF