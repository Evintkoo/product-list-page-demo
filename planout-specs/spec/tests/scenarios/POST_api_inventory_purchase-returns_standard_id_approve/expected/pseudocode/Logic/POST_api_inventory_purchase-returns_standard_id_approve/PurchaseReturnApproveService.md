/**
 * Logic to approve a Purchase Return (Standard)
 * 1. Validate existence and state
 * 2. Update items with supplier confirmed quantities
 * 3. Transition state and record approval metadata
 */

FUNCTION approvePurchaseReturnStandard(id, requestBody, currentUser):
    // 1. Fetch the record
    record = DATABASE.PurchaseReturnStandard.find(id)
    
    IF record IS NULL:
        THROW Error(404, "Purchase Return not found")
    
    // 2. Validate workflow state
    IF record.workflow_state != "Sent to Supplier":
        THROW Error(409, "Purchase Return must be in 'Sent to Supplier' state to be approved")
    
    // 3. Process items
    FOR EACH item IN requestBody.items:
        targetItem = DATABASE.PurchaseReturnItem.find(item.id)
        
        IF targetItem.purchase_return_standard_id != record.id:
            THROW Error(422, "Item does not belong to this Purchase Return")
            
        // Validate quantity (e.g., non-negative)
        IF item.supplier_confirmed_quantity < 0:
            THROW Error(422, "Invalid quantity provided")
            
        targetItem.supplier_confirmed_quantity = item.supplier_confirmed_quantity
        targetItem.save()
    
    // 4. Update Purchase Return Standard
    record.notes = requestBody.notes
    record.workflow_state = "Approved / Confirmed by Supplier"
    record.approved_at = CURRENT_DATETIME
    record.updated_at = CURRENT_DATETIME
    record.updated_by = currentUser.id
    
    record.save()
    
    RETURN record (id, workflow_state, approved_at, updated_at)