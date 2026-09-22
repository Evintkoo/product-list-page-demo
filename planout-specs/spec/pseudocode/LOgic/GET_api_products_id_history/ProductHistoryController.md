FUNCTION getProductPriceHistory(request, response):
    // 1. Extract and validate parameters
    SET productId = request.params.id
    SET page = request.query.page OR 1
    SET limit = request.query.limit OR 20

    IF NOT isValidUuid(productId):
        RETURN response.status(400).json({ error: "Invalid product ID format" })

    // 2. Verify product existence
    SET product = Database.Product.findOne({ id: productId })
    IF product IS NULL:
        RETURN response.status(404).json({ error: "Product not found" })

    // 3. Fetch history records
    // We join with Vendor to ensure we can return vendor names if needed, 
    // though the schema focuses on PurchasePriceHistory fields.
    SET historyRecords = Database.PurchasePriceHistory.findMany(
        where: { product_id: productId },
        orderBy: { effective_date: "DESC" },
        skip: (page - 1) * limit,
        take: limit
    )

    // 4. Return the formatted list
    RETURN response.status(200).json(historyRecords)