/**
 * Search products for the "Product" type-ahead field.
 */
function searchProducts(query) {
    // Maps to Search Product API
    return apiClient.get(`/api/products/search?q=${encodeURIComponent(query)}`);
}