/**
 * Fetches a paginated list of products associated with a specific supplier.
 * Ensures the supplier belongs to the authenticated user's company context.
 */
FUNCTION getProductsBySupplier(supplierId, companyId, page, limit):
    // 1. Validate that the supplier exists and belongs to the current company
    SET supplier = DB.Supplier.findFirst({
        WHERE: {
            id: supplierId,
            company_id: companyId
        }
    })

    IF supplier IS NULL:
        THROW Error("SupplierNotFound")

    // 2. Calculate offset for pagination
    SET offset = (page - 1) * limit

    // 3. Retrieve products for the supplier
    SET products = DB.Product.findMany({
        WHERE: {
            supplier_id: supplierId
        },
        SKIP: offset,
        TAKE: limit,
        ORDER_BY: { name: "ASC" }
    })

    // 4. Get total count for pagination metadata
    SET totalCount = DB.Product.count({
        WHERE: {
            supplier_id: supplierId
        }
    })

    RETURN {
        data: products,
        meta: {
            total: totalCount,
            page: page,
            limit: limit
        }
    }