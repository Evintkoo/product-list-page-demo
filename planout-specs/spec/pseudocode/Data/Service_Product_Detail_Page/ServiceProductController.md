/**
 * API Controller for Service Product endpoints.
 */

ENDPOINT GET /api/service_products/:id:
    TRY:
        product_id = REQUEST.params.id
        data = ServiceProductRepository.getServiceProductById(product_id)
        RETURN HTTP 200 OK WITH data
    CATCH Error:
        RETURN HTTP 404 NOT FOUND WITH { message: "Product not found" }