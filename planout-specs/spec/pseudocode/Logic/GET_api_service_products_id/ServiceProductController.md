/**
 * Controller to handle retrieval of a single Service Product.
 * Logic flow:
 * 1. Validate authentication (ensure user is authorized to access ERP data).
 * 2. Extract 'id' from the request parameters.
 * 3. Query the ServiceProduct entity for the matching record.
 * 4. Return the record or handle errors.
 */

FUNCTION getServiceProductById(request):
    // 1. Authentication Check
    IF NOT request.isAuthenticated():
        RETURN Response(401, { "error": "Unauthorized" })

    // 2. Extract ID
    SET serviceProductId = request.params.id

    // 3. Database Lookup
    SET product = Database.ServiceProduct.findOne({ id: serviceProductId })

    // 4. Response Handling
    IF product IS NULL:
        RETURN Response(404, { "error": "Service product not found" })
    
    TRY:
        RETURN Response(200, {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "currency": product.currency,
            "is_active": product.is_active,
            "created_at": product.created_at,
            "updated_at": product.updated_at
        })
    CATCH Exception:
        RETURN Response(500, { "error": "Internal server error" })