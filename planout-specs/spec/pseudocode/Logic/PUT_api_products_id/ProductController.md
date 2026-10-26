/**
 * Node: PUT /api/products/:id (e6977e94-9d07-413f-959e-d32759f90a27)
 * Description: Updates an existing product object after authenticating, authorizing, and validating the request.
 */
async function updateProduct(req, res) {
    // 1. Authentication & Authorization
    // Verify user session/token. If invalid, return 401 Unauthorized.
    if (!req.user) {
        return res.status(401).send({ error: "Unauthorized" }); // Trigger: 401 Unauthorized
    }

    // Verify user permissions for product modification. If insufficient, return 403 Forbidden.
    if (!req.user.hasPermission('update_product')) {
        return res.status(403).send({ error: "Forbidden" }); // Trigger: 403 Forbidden
    }

    // 2. Validation
    // Validate request body against Product schema. If invalid, return 400 Bad Request.
    const { name, sku, price, stock_quantity } = req.body;
    if (!name || !sku || price === undefined || stock_quantity === undefined) {
        return res.status(400).send({ error: "Bad Request" }); // Trigger: 400 Bad Request
    }

    try {
        // 3. Data Retrieval
        // Attempt to find Product by id.
        const existingProduct = await db.Product.findOne({ where: { id: req.params.id } });
        
        if (!existingProduct) {
            return res.status(404).send({ error: "Not Found" }); // Trigger: 404 Not Found
        }

        // 4. Update Logic
        // Apply updates to Product fields.
        existingProduct.name = name;
        existingProduct.sku = sku;
        existingProduct.price = price;
        existingProduct.stock_quantity = stock_quantity;
        existingProduct.updated_at = new Date();

        await existingProduct.save();

        // 5. Success Response
        return res.status(201).send(existingProduct); // Trigger: 201 Success

    } catch (error) {
        // 6. Error Handling
        return res.status(500).send({ error: "Internal Server Error" }); // Trigger: 500 Internal Server Error
    }
}

/**
 * Notes covered:
 * - Updates an existing product object (e6977e94-9d07-413f-959e-d32759f90a27)
 * - Authenticating (e6977e94-9d07-413f-959e-d32759f90a27)
 * - Authorizing (e6977e94-9d07-413f-959e-d32759f90a27)
 * - Validating the request (e6977e94-9d07-413f-959e-d32759f90a27)
 * - 201 Success (e6977e94-9d07-413f-959e-d32759f90a27)
 * - 400 Bad Request (e6977e94-9d07-413f-959e-d32759f90a27)
 * - 401 Unauthorized (e6977e94-9d07-413f-959e-d32759f90a27)
 * - 403 Forbidden (e6977e94-9d07-413f-959e-d32759f90a27)
 * - 404 Not Found (e6977e94-9d07-413f-959e-d32759f90a27)
 * - 500 Internal Server Error (e6977e94-9d07-413f-959e-d32759f90a27)
 */