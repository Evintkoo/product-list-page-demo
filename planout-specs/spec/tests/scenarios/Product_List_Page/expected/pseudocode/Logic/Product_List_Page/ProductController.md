/**
 * Handles the GET /products request.
 * Maps the internal Product entity fields to the API response format.
 */
function handleGetProducts(request) {
    const { page = 1, limit = 20, search = "", brandName = "" } = request.query;

    const productData = getProducts(page, limit, search, brandName);

    // Map internal fields to the response structure
    return productData.map(product => ({
        id: product.id,
        sku: product.sku,
        productName: product.productName,
        brandName: product.brandName,
        productCode: product.productCode,
        tax: product.tax,
        price: product.price,
        created_at: product.created_at
    }));
}