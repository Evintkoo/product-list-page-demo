FUNCTION handleGetProductPurchases(request):
    // 1. Validate path parameter
    SET productId = request.params.id
    IF NOT isValidUuid(productId):
        RETURN 400 "Invalid product ID format"

    // 2. Verify product existence
    SET product = Database.find("Product", { id: productId })
    IF product IS NULL:
        RETURN 404 "Product not found"

    // 3. Authorization check
    IF NOT User.hasPermission("view_product_purchases", productId):
        RETURN 403 "Forbidden"

    // 4. Parse and validate query filters
    SET filters = {}
    IF request.query.q.supplier_id_eq IS PRESENT:
        filters.supplier_id = request.query.q.supplier_id_eq
    
    SET sortOptions = request.query.q.s OR "purchase_date DESC"
    SET limit = request.query.page_rows OR 20

    // 5. Fetch data
    TRY:
        SET purchases = Database.query("Purchase")
            .where({ product_id: productId })
            .where(filters)
            .orderBy(sortOptions)
            .limit(limit)
            .execute()
            
        RETURN 200, purchases
    CATCH DatabaseError:
        RETURN 500 "Internal Server Error"
    CATCH ValidationError:
        RETURN 422 "Filter values fail validation"