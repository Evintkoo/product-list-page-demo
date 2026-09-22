/**
 * API Endpoint: GET /api/service_products/:id/edit
 * Provides data to populate the Service Product Edit Page.
 */
ENDPOINT GET /api/service_products/:id/edit(id) {
    product = ServiceProductRepository.getServiceProductById(id);
    RETURN Response.json(product);
}

/**
 * API Endpoint: PATCH /api/service_products/:id
 * Processes form submission and updates the record.
 */
ENDPOINT PATCH /api/service_products/:id(id, body) {
    TRY {
        updatedProduct = ServiceProductRepository.updateServiceProduct(id, body);
        RETURN Response.json(updatedProduct, status=200);
    } CATCH ValidationError e {
        RETURN Response.error(e.message, status=400);
    }
}