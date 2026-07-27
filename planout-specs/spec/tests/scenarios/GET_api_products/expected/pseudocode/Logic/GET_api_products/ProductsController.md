FUNCTION handleGetProducts(request, response):
    // 1. Authentication check
    userIdentity = extractAuthenticatedUser(request)
    IF userIdentity is missing OR invalid:
        RETURN response.status(401).body({ error: "Unauthorized", code: "AUTH_REQUIRED" })

    // 2. Extract and validate query parameters
    rawPage = request.query.page
    rawLimit = request.query.limit

    // Defaults when not provided
    page = rawPage IS NOT PROVIDED ? 1 : parseInteger(rawPage)
    limit = rawLimit IS NOT PROVIDED ? 20 : parseInteger(rawLimit)

    IF page is not a valid positive integer OR limit is not a valid positive integer:
        RETURN response.status(400).body({ error: "Malformed query parameters", code: "INVALID_QUERY_PARAMS" })

    // Optional upper bound guard on limit to avoid huge payloads
    IF limit > 100:
        limit = 100

    TRY:
        result = ProductService.getPaginatedProducts(page, limit)

        IF result.totalCount == 0 AND page > 1:
            // Requested page beyond available data
            RETURN response.status(404).body({ error: "No products found for requested page", code: "PAGE_NOT_FOUND" })

        // 3. Build response payload matching Product List JSON Schema
        responseBody = {
            data: result.items.map(product => ({
                id: product.id,
                sku: product.sku,
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                currency: product.currency,
                stock_quantity: product.stock_quantity,
                is_active: product.is_active,
                created_at: product.created_at,
                updated_at: product.updated_at
            })),
            pagination: {
                page: page,
                limit: limit,
                total: result.totalCount,
                totalPages: ceil(result.totalCount / limit)
            }
        }

        RETURN response.status(200).body(responseBody)

    CATCH error:
        LOG error details for diagnostics
        RETURN response.status(500).body({ error: "Internal server error", code: "SERVER_ERROR" })