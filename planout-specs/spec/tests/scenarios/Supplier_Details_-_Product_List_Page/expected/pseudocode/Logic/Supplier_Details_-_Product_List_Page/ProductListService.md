/**
 * Fetches the list of products for a specific supplier and applies 
 * the required UI mapping transformations.
 */
async function getSupplierProductList(supplier_id: UUID) {
    // Fetch raw product data from the database
    const rawProducts = await db.Product.findMany({
        where: { supplier_id: supplier_id }
    });

    // Map raw entities to the UI-specific format defined in Mapping Rules
    return rawProducts.map(product => ({
        id: product.id,
        productName: product.name,
        sku: product.sku,
        // Mapping rule: discount percentage
        supplierDiscount: calculateDiscount(product), <!-- MISSING_FIELD: Product.discount_percentage -->
        // Mapping rule: boolean rendered as check/x icon
        trackInventory: determineInventoryTracking(product.stock_level)
    }));
}

/**
 * Helper to determine if inventory should be tracked based on stock status
 */
function determineInventoryTracking(stock_level: number): boolean {
    return stock_level > 0;
}

/**
 * Placeholder for discount calculation logic
 */
function calculateDiscount(product: Product): number {
    // Logic to derive discount from product pricing or supplier terms
    return 0.0; 
}