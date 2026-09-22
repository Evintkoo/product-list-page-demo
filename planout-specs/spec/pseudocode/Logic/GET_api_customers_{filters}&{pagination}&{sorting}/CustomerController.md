FUNCTION getCustomers(request):
    // 1. Validate Authentication
    IF NOT request.isAuthenticated():
        RETURN 401 Unauthorized

    // 2. Extract and Validate Query Parameters
    // Required: type
    // Optional: name, status, phone, email, page, per_page, sort, order
    TRY:
        params = validateQueryParams(request.query, {
            required: ["type"],
            allowed: ["type", "name", "status", "phone", "email", "page", "per_page", "sort", "order"]
        })
    CATCH error:
        RETURN 400 Bad Request (error.message)

    // 3. Delegate to Service Layer
    result = CustomerService.findCustomers(params)
    
    RETURN 200 OK (result)