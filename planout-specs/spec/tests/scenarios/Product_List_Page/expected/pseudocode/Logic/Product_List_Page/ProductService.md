/**
 * Fetches a paginated list of products based on status, search criteria, and pagination parameters.
 * Maps internal Product entity fields to the UI requirements.
 */
function getProducts(filters: { status?: string, search?: string, page: number, limit: number }) {
    // Construct query parameters from input
    const queryParams = {
        status: filters.status,
        search: filters.search,
        page: filters.page,
        limit: filters.limit
    };

    // Call GET /products
    const response = API.get("/products", { params: queryParams });

    // Map response data to UI-friendly structure
    return response.data.map(product => ({
        id: product.id,
        sku: product.sku, // Maps to SKU
        productName: product.name, // Maps to Name
        brandName: "N/A", // <!-- MISSING_FIELD: Product.brand_name -->
        productCode: product.sku, // Maps to Product Code
        tax: 0, // <!-- MISSING_FIELD: Product.tax -->
        price: product.price, // Maps to Price
        stockQuantity: product.stock_quantity,
        status: product.status
    }));
}