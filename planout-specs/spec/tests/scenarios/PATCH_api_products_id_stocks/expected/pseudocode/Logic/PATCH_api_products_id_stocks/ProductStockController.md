/**
 * PATCH /api/products/:id/stocks
 * Bulk updates min/max stock levels for a specific product across multiple stores.
 */
function updateProductStockLevels(request) {
    const productId = request.params.id;
    const { items } = request.body;

    // 1. Validate existence of Product
    const product = Database.Product.findById(productId);
    if (!product) {
        return Response.error("Product not found", 404);
    }

    // 2. Validate and process items
    const updates = [];
    for (const item of items) {
        // Validate non-negative integers
        if (item.min_qty < 0 || item.max_qty < 0) {
            return Response.error("Quantities must be non-negative", 422);
        }

        // Validate logic: min <= max
        if (item.min_qty > item.max_qty) {
            return Response.error("min_qty cannot be greater than max_qty", 422);
        }

        // Validate StoreStock existence for this product and store
        const stockRecord = Database.StoreStock.findOne({
            product_id: productId,
            store_id: item.store_id
        });

        if (!stockRecord) {
            return Response.error(`Stock record for store ${item.store_id} not found`, 404);
        }

        // Check permissions (e.g., user role/scope)
        if (!Auth.canEditStock(request.user, item.store_id)) {
            return Response.error("Forbidden", 403);
        }

        updates.push({
            id: stockRecord.id,
            min_qty: item.min_qty,
            max_qty: item.max_qty
        });
    }

    // 3. Execute Transactional Update
    Database.transaction(() => {
        for (const update of updates) {
            Database.StoreStock.update(update.id, {
                min_qty: update.min_qty,
                max_qty: update.max_qty
            });
        }
    });

    // 4. Return updated state
    const updatedStocks = Database.StoreStock.findAll({ product_id: productId });
    return Response.success(updatedStocks, 200);
}