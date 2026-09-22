/**
 * Controller to handle the retrieval of a single Service Product.
 * Maps the request parameter to the database lookup.
 */
function getServiceProduct(request) {
    const { id } = request.params;

    // Fetch the primary ServiceProduct record
    const serviceProduct = Database.ServiceProduct.findById(id);

    if (!serviceProduct) {
        return Response.error("Service product not found", 404);
    }

    // Fetch associated TaxCategory for the Tax Section
    const taxCategory = Database.TaxCategory.findById(serviceProduct.tax_category_id);

    // Construct the response object mapping fields to the UI sections
    return Response.success({
        id: serviceProduct.id,
        name: serviceProduct.name,
        description: serviceProduct.description,
        sku: serviceProduct.sku,
        is_active: serviceProduct.is_active,
        base_price: serviceProduct.base_price,
        currency: serviceProduct.currency,
        updated_at: serviceProduct.updated_at,
        tax_category: {
            id: taxCategory.id,
            name: taxCategory.name,
            rate: taxCategory.rate
        }
    });
}