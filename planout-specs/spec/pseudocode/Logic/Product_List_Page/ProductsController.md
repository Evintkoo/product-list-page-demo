// Handles incoming HTTP requests for the Product List Page.
// Both the initial page load and the "Apply Search" button invoke the
// same endpoint with different query parameters, so a single handler
// covers both flows described in the canvas.

FUNCTION handleGetProducts(request, response):
    // 1. Parse and normalize incoming query parameters
    SET page = parseInteger(request.query.page, defaultValue = 1)
    SET pageSize = parseInteger(request.query.pageSize, defaultValue = 20)
    SET searchTerm = trimString(request.query.search, defaultValue = "")
    SET categoryFilter = request.query.category OR null      // maps to Product.category
    SET statusFilter = request.query.status OR null          // maps to Product.status
    SET brandFilter = request.query.brandName OR null         // maps to Product.brandName
    SET sortBy = request.query.sortBy OR "createdAt"
    SET sortOrder = request.query.sortOrder OR "desc"

    // 2. Basic validation
    IF page < 1 OR pageSize < 1 THEN
        RETURN response.status(400).json({
            error: "Invalid pagination parameters",
            code: "INVALID_PAGINATION"
        })
    END IF

    TRY:
        // 3. Delegate to service layer to fetch filtered, paginated data
        SET result = ProductsService.searchProducts({
            searchTerm: searchTerm,
            categoryFilter: categoryFilter,
            statusFilter: statusFilter,
            brandFilter: brandFilter,
            sortBy: sortBy,
            sortOrder: sortOrder,
            page: page,
            pageSize: pageSize
        })

        // 4. Map each Product record to the response shape expected by the UI
        SET mappedProducts = MAP result.items USING mapProductToResponse

        RETURN response.status(200).json({
            items: mappedProducts,
            totalCount: result.totalCount,
            page: page,
            pageSize: pageSize
        })
    CATCH error:
        LOG error
        RETURN response.status(500).json({
            error: "Unable to retrieve products",
            code: "PRODUCT_FETCH_FAILED"
        })
    END TRY
END FUNCTION

// Applies the mapping rules from the JSON response to the UI fields:
// SKU -> SKU, productName -> Name, brandName -> Brand,
// productCode -> Product Code, tax -> Tax, price -> Price
FUNCTION mapProductToResponse(product):
    RETURN {
        id: product.id,
        SKU: product.SKU,
        productName: product.productName,
        brandName: product.brandName,
        productCode: product.productCode,
        tax: product.tax,
        price: product.price,
        category: product.category,
        stockQuantity: product.stockQuantity,
        status: product.status,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    }
END FUNCTION