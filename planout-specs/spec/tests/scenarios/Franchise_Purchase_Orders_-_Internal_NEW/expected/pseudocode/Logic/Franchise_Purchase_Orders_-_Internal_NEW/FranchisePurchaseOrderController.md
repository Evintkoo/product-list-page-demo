/**
 * API Controller for POST /api/franchise_purchase_orders
 */
ENDPOINT POST /api/franchise_purchase_orders(request)
    TRY
        // Extract header and line items from request body
        SET headerData = request.body.header
        SET lineItems = request.body.line_items

        // Call service layer
        SET result = createFranchisePurchaseOrder(headerData, lineItems)

        RETURN 201, result
    CATCH error
        RETURN 422, { error: error.message }
    END TRY
END ENDPOINT