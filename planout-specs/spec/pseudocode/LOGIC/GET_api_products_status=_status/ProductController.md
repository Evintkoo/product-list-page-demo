FUNCTION getProducts(request):
    // 1. Validate Authentication and Authorization
    IF NOT user.isAuthenticated():
        RETURN 401 Unauthorized
    IF NOT user.hasPermission("list_products"):
        RETURN 403 Forbidden

    // 2. Extract and Validate Query Parameters
    SET filters = extractFilters(request.query)
    IF NOT validateFilters(filters):
        RETURN 422 Unprocessable Entity

    // 3. Verify existence of foreign key references if provided
    IF filters.product_brand_id_eq AND NOT Brand.exists(filters.product_brand_id_eq):
        RETURN 404 Not Found ("Brand not found")
    
    IF filters.product_type_id_eq AND NOT Type.exists(filters.product_type_id_eq):
        RETURN 404 Not Found ("Type not found")

    // 4. Fetch Data from Database
    TRY:
        SET products = ProductService.fetchFilteredProducts(filters)
        RETURN 200 OK (products)
    CATCH DatabaseError:
        RETURN 500 Internal Server Error