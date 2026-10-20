/**
 * Controller to handle retrieval of warehouse stocks for a specific product.
 */
async function getProductWarehouseStocks(req, res) {
    const { id: productId } = req.params;
    const { warehouse_id, name, location_code, page = 1, limit = 20 } = req.query;

    // 1. Validate Product existence
    const product = await db.Product.findOne({ where: { id: productId } });
    if (!product) {
        return res.status(404).json({ error: "Product not found", code: "PRODUCT_NOT_FOUND" });
    }

    // 2. Build query filters for Warehouse and WarehouseStock
    const whereClause = { product_id: productId };
    const warehouseFilters = {};

    if (warehouse_id) warehouseFilters.id = warehouse_id;
    if (name) warehouseFilters.name = name;
    if (location_code) warehouseFilters.location_code = location_code;

    // 3. Fetch stocks joined with Warehouse data
    const { rows, count } = await db.WarehouseStock.findAndCountAll({
        where: whereClause,
        include: [{
            model: db.Warehouse,
            where: warehouseFilters,
            required: true
        }],
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit)
    });

    // 4. Calculate additional metrics
    // Note: reserved/in-transit/cost fields are derived logic
    const processedData = rows.map(stock => ({
        id: stock.id,
        quantity_on_hand: stock.quantity_on_hand,
        warehouse_name: stock.Warehouse.name,
        location_code: stock.Warehouse.location_code,
        last_updated: stock.last_updated,
        reserved_quantity: 0, <!-- MISSING_FIELD: WarehouseStock.reserved_quantity -->
        in_transit_quantity: 0, <!-- MISSING_FIELD: WarehouseStock.in_transit_quantity -->
        total_cost: 0 <!-- MISSING_FIELD: WarehouseStock.total_cost -->
    }));

    // 5. Return response
    return res.status(200).json({
        total_quantity: count,
        data: processedData
    });
}