/**
 * Logic to orchestrate the data population for the Detail Page.
 * The UI sections are populated as follows:
 * - Detail Section: name, description, sku
 * - Tax Section: tax_category.name, tax_category.rate
 * - Settings Section: is_active
 * - Store Pricing Section: base_price, currency
 * - Changes Section: updated_at <!-- MISSING_FIELD: ServiceProduct.updated_by -->
 */
function fetchServiceProductDetails(id) {
    // Call the API endpoint defined in the contract
    const response = API.get(`/api/service_products/${id}`);
    
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error("Failed to load service product details");
    }
}