/**
 * Handles the product lookup for stock transfers.
 * Requires from_location_id to calculate inventory metrics.
 */
function getProductLookup(request) {
    const { search, from_location_id, to_location_id, limit = 30, page = 1 } = request.query;

    // 1. Validation
    if (!from_location_id) {
        return respondWithError(422, "Source location is required for inventory lookup.");
    }

    // 2. Fetch Products matching search criteria
    // We join with Inventory to get the source location's stock data
    const products = database.Product.findMany({
        where: {
            OR: [
                { sku: { contains: search } },
                { code: { contains: search } },
                { name: { contains: search } }
            ]
        },
        limit: limit,
        offset: (page - 1) * limit
    });

    // 3. Enrich with Inventory data
    const results = products.map(product => {
        const sourceInventory = database.Inventory.findOne({
            where: { product_id: product.id, location_id: from_location_id }
        });

        let destInventory = null;
        if (to_location_id) {
            destInventory = database.Inventory.findOne({
                where: { product_id: product.id, location_id: to_location_id }
            });
        }

        return {
            id: product.id,
            sku: product.sku,
            code: product.code,
            name: product.name,
            quantity_on_hand_source: sourceInventory?.quantity_on_hand || 0,
            quantity_on_hand_destination: destInventory?.quantity_on_hand || 0,
            average_unit_cost: sourceInventory?.average_unit_cost || 0
        };
    });

    return respondWithSuccess(200, results);
}