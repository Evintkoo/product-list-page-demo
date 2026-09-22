FUNCTION createSalesOrderReturn(requestBody, authenticatedUser):
    // 1. Validation Phase
    companyId = authenticatedUser.company_id
    
    // Verify existence and ownership
    warehouse = FIND Warehouse WHERE id = requestBody.warehouse_id AND company_id = companyId
    IF NOT warehouse: THROW 404 "Warehouse not found"

    customer = FIND Customer WHERE id = requestBody.customer_id AND company_id = companyId
    IF NOT customer: THROW 404 "Customer not found"

    invoice = FIND SalesInvoice WHERE id = requestBody.sales_invoice_id AND company_id = companyId AND customer_id = customer.id
    IF NOT invoice: THROW 404 "Sales Invoice not found"

    // Validate items
    IF requestBody.items IS EMPTY: THROW 400 "At least one return item is required"

    START TRANSACTION
        // Generate unique return number
        newReturnNumber = GENERATE_UNIQUE_STRING() <!-- MISSING_FIELD: SalesOrderReturn.return_number_generation_logic -->
        
        // Create Header
        newReturn = INSERT INTO SalesOrderReturn (
            id: GENERATE_UUID(),
            company_id: companyId,
            return_number: newReturnNumber,
            warehouse_id: requestBody.warehouse_id,
            customer_id: requestBody.customer_id,
            sales_invoice_id: requestBody.sales_invoice_id,
            status: "draft",
            notes: requestBody.notes
        )

        FOR EACH item IN requestBody.items:
            // Validate quantity
            IF item.quantity <= 0: THROW 400 "Quantity must be greater than 0"
            
            invoiceItem = FIND SalesInvoiceItem WHERE id = item.sales_invoice_item_id AND sales_invoice_id = invoice.id
            IF NOT invoiceItem: THROW 404 "Sales Invoice Item not found"
            
            // Check for over-return (Concurrency check)
            alreadyReturned = SUM(SalesOrderReturnItem.quantity) WHERE sales_invoice_item_id = invoiceItem.id
            remaining = invoiceItem.quantity - alreadyReturned
            
            IF item.quantity > remaining:
                THROW 409 "Returned quantity exceeds remaining invoice quantity"
            
            // Create Item
            INSERT INTO SalesOrderReturnItem (
                id: GENERATE_UUID(),
                sales_order_return_id: newReturn.id,
                sales_invoice_item_id: item.sales_invoice_item_id,
                quantity: item.quantity
            )
        END FOR
    COMMIT TRANSACTION

    RETURN newReturn (201 Created)

CATCH ERRORS:
    ROLLBACK TRANSACTION
    IF error IS 404/400/409: RETURN error
    ELSE: RETURN 500 "Unexpected server error"