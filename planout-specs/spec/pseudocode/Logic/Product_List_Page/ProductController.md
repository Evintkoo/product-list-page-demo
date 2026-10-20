/**
 * Handles the logic for the Product List Page.
 * Orchestrates data fetching and mapping for the UI.
 */
class ProductController {
    
    // State to hold the current list of products
    private products = [];

    /**
     * Triggered on Page Load or when the Search/Filter button is clicked.
     */
    async loadProductList(filters: { search?: string, brandName?: string }, pagination: { page: number, limit: number }) {
        const response = await fetchProducts({
            ...pagination,
            ...filters
        });

        this.products = response.map(product => ({
            sku: product.sku,
            productName: product.productName,
            brandName: product.brandName,
            productCode: product.productCode,
            tax: product.tax,
            price: product.price
        }));

        return this.products;
    }
}