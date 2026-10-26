/**
 * Node: GET /api/products/:id/prices/by-warehouse (b3fa5ff4-7e59-4540-a009-f9cd27791bd9)
 * 
 * Logic:
 * 1. Validate that the 'id' path parameter is a valid UUID.
 *    - If invalid, return 400 Bad Request (via 400 Bad Request Shape).
 * 2. Check caller authentication and authorization.
 *    - If unauthorized/forbidden, return 401 or 403 (via 401/403 Error Shape).
 * 3. Query the database for the Product by 'id'.
 *    - If Product does not exist, return 404 Not Found (via 404 Not Found Shape).
 * 4. Query WarehousePrice where 'product_id' matches the provided 'id'.
 *    - If no records found, return 404 Not Found (via 404 Not Found Shape).
 * 5. If successful, return 200 OK with a list of objects containing 'warehouse_id', 'currency', and 'price'.
 * 6. If an unexpected error occurs (e.g., database connection failure), return 500 Internal Server Error.
 */

async function getProductWarehousePrices(req, res) {
    const { id } = req.params;

    // Step 1: Validation
    if (!isValidUuid(id)) {
        return res.status(400).json({ error: "Invalid product id", code: "BAD_REQUEST" });
    }

    // Step 2: Auth
    if (!isAuthorized(req.user)) {
        return res.status(401).json({ error: "Not authorized to view pricing data", code: "UNAUTHORIZED" });
    }
    if (!hasPermission(req.user, 'view_pricing')) {
        return res.status(403).json({ error: "Not authorized to view pricing data", code: "FORBIDDEN" });
    }

    try {
        // Step 3: Product Existence
        const product = await db.Product.findOne({ where: { id } });
        if (!product) {
            return res.status(404).json({ error: "Product not found or has no warehouse pricing", code: "NOT_FOUND" });
        }

        // Step 4: Pricing Lookup
        const prices = await db.WarehousePrice.findAll({ where: { product_id: id } });
        if (!prices || prices.length === 0) {
            return res.status(404).json({ error: "Product not found or has no warehouse pricing", code: "NOT_FOUND" });
        }

        // Step 5: Success
        return res.status(200).json(prices.map(p => ({
            warehouse_id: p.warehouse_id,
            currency: p.currency,
            price: p.price
        })));

    } catch (error) {
        // Step 6: Unexpected Failure
        return res.status(500).json({ error: "Internal Server Error", code: "INTERNAL_SERVER_ERROR" });
    }
}

/**
 * Notes covered:
 * - Retrieves warehouse-specific pricing for a single product identified by its product ID path parameter.
 * - 200 OK returns a list of price entries (warehouse_id, currency, price).
 * - 400 Bad Request returned if product id is malformed or missing.
 * - 404 Not Found returned if product does not exist or has no warehouse pricing.
 * - 401 Unauthorized or 403 Forbidden returned if caller lacks permission.
 * - 500 Internal Server Error indicates unexpected failure.
 */