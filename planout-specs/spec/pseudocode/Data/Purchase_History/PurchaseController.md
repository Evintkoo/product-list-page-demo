/**
 * API Controller for handling Purchase History requests.
 * Maps the GET /api/products/:id/purchases endpoint to the repository.
 */

FUNCTION handleGetProductPurchases(request):
    // Extract product ID from the URL parameters
    SET productId = request.params.id
    
    // Validate that the product exists (optional check)
    IF NOT Product.exists(productId):
        RETURN Error(404, "Product not found")
    
    // Fetch records from the repository
    SET purchaseRecords = PurchaseRepository.getPurchasesByProductId(productId)
    
    // Return the list of records as a JSON response
    RETURN Response.json(purchaseRecords)