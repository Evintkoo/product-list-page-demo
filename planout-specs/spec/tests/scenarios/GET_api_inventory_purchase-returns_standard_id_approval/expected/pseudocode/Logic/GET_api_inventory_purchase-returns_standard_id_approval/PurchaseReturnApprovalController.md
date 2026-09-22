/**
 * Logic for fetching Purchase Return Standard details for the approval workflow.
 */
FUNCTION getPurchaseReturnApproval(id, company_id) {
    // 1. Fetch the Purchase Return record
    // Ensure the record belongs to the authenticated company_id
    LET purchaseReturn = DB.PurchaseReturn.findFirst({
        where: { id: id, company_id: company_id }
    });

    IF NOT purchaseReturn THEN
        RETURN 404 "Purchase Return not found";
    ENDIF

    // 2. Validate workflow state
    // The approval form is only accessible if the state is 'Sent to Supplier'
    IF purchaseReturn.workflow_state != "Sent to Supplier" THEN
        RETURN 409 "Purchase Return must be in 'Sent to Supplier' state to be approved";
    ENDIF

    // 3. Fetch related entities
    LET warehouse = DB.Warehouse.findById(purchaseReturn.warehouse_id);
    LET supplier = DB.Supplier.findById(purchaseReturn.supplier_id);
    LET items = DB.PurchaseReturnItem.findMany({
        where: { purchase_return_id: purchaseReturn.id }
    });

    // 4. Construct response
    RETURN 200 {
        "id": purchaseReturn.id,
        "workflow_state": purchaseReturn.workflow_state,
        "notes": purchaseReturn.notes,
        "warehouse": {
            "id": warehouse.id,
            "name": warehouse.name
        },
        "supplier": {
            "id": supplier.id,
            "name": supplier.name
        },
        "items": items.map(item => ({
            "id": item.id,
            "quantity_returned": item.quantity_returned,
            "supplier_confirmed_quantity": item.supplier_confirmed_quantity
        })),
        "supplier_confirmed_total": calculateTotal(items) <!-- MISSING_FIELD: PurchaseReturnItem.supplier_confirmed_quantity_sum -->
    };
}