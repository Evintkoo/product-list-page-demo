/**
 * Controller for handling product search requests.
 * Orchestrates validation, query building, and data retrieval.
 */
function getProducts(request) {
    // 1. Validate Authentication and Authorization
    if (!request.isAuthenticated()) return 401;
    if (!request.user.hasPermission('list_products')) return 403;

    // 2. Extract and Sanitize Query Parameters
    const filters = request.query.q || {};
    const pageRows = parseInt(request.query.page_rows) || 20;
    const sortOrder = request.query.q.s || 'name asc';

    // 3. Validate Foreign Key existence if provided
    if (filters.product_brand_id_eq && !exists('ProductBrand', filters.product_brand_id_eq)) return 404;
    if (filters.product_type_id_eq && !exists('ProductType', filters.product_type_id_eq)) return 404;
    if (filters.tax_id_eq && !exists('Tax', filters.tax_id_eq)) return 404;
    
    // 4. Execute Search via Service
    try {
        const results = ProductService.search({
            sku: filters.sku_cont,
            name: filters.name_cont,
            product_code: filters.product_code_cont,
            product_brand_id: filters.product_brand_id_eq,
            product_type_id: filters.product_type_id_eq,
            tax_id: filters.tax_id_eq,
            tag_ids: filters.product_tags_id_in,
            info_1: filters.info_1_cont,
            info_2: filters.info_2_cont,
            info_3: filters.info_3_cont,
            sort: sortOrder,
            limit: pageRows
        });
        
        return 200, results;
    } catch (error) {
        return 500, { error: "Internal Server Error" };
    }
}