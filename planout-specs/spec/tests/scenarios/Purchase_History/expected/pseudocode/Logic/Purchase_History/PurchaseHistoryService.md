/**
 * Logic to retrieve purchase history for a specific product.
 * Triggered on page load.
 */
function getPurchaseHistory(productId) {
    // 1. Validate that the product ID is provided
    if (!productId) {
        throw new Error("Product ID is required to fetch purchase history.");
    }

    // 2. Query the Purchase entity for all records matching the product_id
    // The system filters by product_id and sorts by purchase_date descending by default
    const purchaseRecords = database.Purchase.findMany({
        where: {
            product_id: productId
        },
        orderBy: {
            purchase_date: "desc"
        }
    });

    // 3. Return the list of purchase records to the frontend
    return purchaseRecords;
}