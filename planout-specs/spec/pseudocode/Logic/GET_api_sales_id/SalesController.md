FUNCTION getSaleById(request, response):
    // 1. Extract ID from path parameters
    SET saleId = request.params.id

    // 2. Validate authentication and authorization
    IF NOT isAuthenticated(request):
        RETURN response.status(401).json({ error: "Unauthorized" })
    
    IF NOT isAuthorized(request, "READ_SALE", saleId):
        RETURN response.status(403).json({ error: "Forbidden" })

    // 3. Fetch Sale entity
    SET sale = DATABASE.Sale.findUnique({
        where: { id: saleId }
    })

    // 4. Handle Not Found
    IF sale IS NULL:
        RETURN response.status(404).json({ error: "Sale not found" })

    // 5. Fetch associated SaleItems
    SET items = DATABASE.SaleItem.findMany({
        where: { sale_id: saleId }
    })

    // 6. Construct response object
    SET responseData = {
        id: sale.id,
        customer_id: sale.customer_id,
        total_amount: sale.total_amount,
        status: sale.status,
        created_at: sale.created_at,
        updated_at: sale.updated_at,
        items: items
    }

    // 7. Return success
    RETURN response.status(200).json(responseData)

CATCH error:
    RETURN response.status(500).json({ error: "Internal Server Error" })