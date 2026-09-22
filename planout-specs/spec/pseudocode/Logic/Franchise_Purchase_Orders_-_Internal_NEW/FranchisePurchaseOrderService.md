/**
 * Handles the creation of a new Franchise Purchase Order.
 * Orchestrates the persistence of the header record and associated line items.
 */
FUNCTION createFranchisePurchaseOrder(formData, lineItemsData)
    // 1. Validate incoming data
    IF formData IS EMPTY OR lineItemsData IS EMPTY THEN
        RETURN ERROR "Missing required purchase order information"
    END IF

    // 2. Prepare the FranchisePurchaseOrder record
    // Set initial workflow state to 'draft' as per business requirement
    SET newOrder = {
        workflow_state: "draft",
        order_type: formData.order_type,
        warehouse_id: formData.warehouse_id,
        store_id: formData.store_id,
        supplier_id: formData.supplier_id,
        supplier_ref_code: formData.supplier_ref_code,
        due_at: formData.due_at,
        notes: formData.notes,
        created_at: CURRENT_TIMESTAMP
    }

    // 3. Persist the header record
    INSERT INTO FranchisePurchaseOrder VALUES newOrder
    SET orderId = newOrder.id

    // 4. Process and persist line items
    FOR EACH item IN lineItemsData DO
        SET lineItem = {
            purchase_order_id: orderId,
            product_id: item.product_id,
            store_qty: item.store_qty,
            order_qty: item.order_qty,
            supply_price: item.supply_price,
            store_remark: item.store_remark
        }
        
        INSERT INTO FranchisePurchaseOrderLineItem VALUES lineItem
    END FOR

    // 5. Return the created order ID for navigation
    RETURN { id: orderId, status: "success" }
END FUNCTION