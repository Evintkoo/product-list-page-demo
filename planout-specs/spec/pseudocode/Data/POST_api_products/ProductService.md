/**
 * Orchestrates the creation of a product.
 * Handles validation checks and repository interaction.
 */
FUNCTION handleCreateProductRequest(requestBody):
    // 1. Validate required fields
    IF NOT requestBody.sku OR NOT requestBody.name:
        THROW Error("400: Missing required fields (sku or name)")

    // 2. Check for SKU conflict
    SET existingProduct = findProductBySku(requestBody.sku)
    IF existingProduct IS NOT NULL:
        THROW Error("409: SKU already exists")

    // 3. Attempt to persist
    TRY:
        SET savedProduct = createProduct(requestBody)
        RETURN savedProduct
    CATCH error:
        // Log internal error for observability
        LOG error
        THROW Error("500: Internal server error")