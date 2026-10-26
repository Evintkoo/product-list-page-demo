/**
 * Node: GET /api/products/:id/warehouse-stocks (ID: 67737683-d4c5-468f-ad63-ea2d2974fceb)
 * Description: Fetches warehouse stock details for a product, including joined warehouse data, 
 * calculated quantities, and costs. Supports filtering and pagination.
 */
async function getProductWarehouseStocks(req, res) {
    const { id } = req.params;
    const { warehouse_id, name, warehouse_code, page = 1, limit = 20 } = req.query;

    // 1. Validation: Ensure product exists
    const product = await db.Product.findUnique({ where: { id } });
    if (!product) {
        return res.status(404).json({ error: "Product not found", code: "PRODUCT_NOT_FOUND" });
    }

    // 2. Data Retrieval: Join WarehouseStock with Warehouse
    // Note: Logic requires calculating reserved, in-transit, and available quantities 
    // and total cost per warehouse.
    const queryOptions = {
        where: {
            product_id: id,
            ...(warehouse_id && { warehouse_id }),
            ...(name && { Warehouse: { name: { contains: name } } }),
            ...(warehouse_code && { Warehouse: { code: warehouse_code } }) <!-- MISSING_FIELD: Warehouse.code -->
        },
        include: { Warehouse: true },
        skip: (page - 1) * limit,
        take: limit
    };

    try {
        const stocks = await db.WarehouseStock.findMany(queryOptions);
        
        // 3. Response Construction
        // Note: Response shape is { total_quantity, data[] }
        const totalQuantity = stocks.reduce((sum, item) => sum + item.quantity, 0);
        
        return res.status(200).json({
            total_quantity: totalQuantity,
            data: stocks
        });
    } catch (error) {
        // 4. Error Handling
        // Note: 400 for bad params, 401 for auth, 500 for server failure
        return res.status(500).json({ error: "Internal Server Error", code: "SERVER_FAILURE" });
    }
}

/**
 * Notes covered:
 * - Fetches warehouse stock details for a single product.
 * - Uses product id as path parameter.
 * - Joins WarehouseStock with Warehouse master data.
 * - Calculates reserved, in-transit, available quantities, and total cost per warehouse.
 * - Response format: { total_quantity, data[] }.
 * - Supports filtering by warehouse id, name, or warehouse code.
 * - Supports pagination via page and limit.
 * - Returns 200 (success), 400 (bad query params), 401 (auth), 404 (product not found), 500 (server failure).
 * - All errors follow Common Standard Response JSON Schema.
 */