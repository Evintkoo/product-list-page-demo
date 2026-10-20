/**
 * Controller for handling product search requests.
 * Maps incoming query parameters to database filters.
 */
function getProducts(request) {
    // 1. Validate Authentication and Authorization
    if (!request.isAuthenticated()) return respond(401, "Unauthorized");
    if (!request.user.hasPermission("list_products")) return respond(403, "Forbidden");

    // 2. Extract and Sanitize Query Parameters
    const filters = {
        sku: request.query["q[sku_cont]"],
        name: request.query["q[name_cont]"],
        product_code: request.query["q[product_code_cont]"],
        brand_id: request.query["q[product_brand_id_eq]"],
        type_id: request.query["q[product_type_id_eq]"],
        tax_id: request.query["q[tax_id_eq]"],
        tag_ids: request.query["q[product_tags_id_in]"],
        info_1: request.query["q[info_1_cont]"],
        info_2: request.query["q[info_2_cont]"],
        info_3: request.query["q[info_3_cont]"],
        sort: request.query["q[s]"],
        limit: request.query["page_rows"]
    };

    // 3. Delegate to Service Layer
    try {
        const results = ProductService.search(filters);
        return respond(200, results);
    } catch (error) {
        return handleServiceError(error);
    }
}