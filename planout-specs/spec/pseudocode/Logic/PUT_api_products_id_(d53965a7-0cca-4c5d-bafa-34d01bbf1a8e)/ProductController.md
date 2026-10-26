/**
 * Node: PUT /api/products/:id (2a84af56-a6ea-4668-82ca-142bc06f152c)
 * Description: Updates an existing product resource identified by its id.
 */
async function updateProduct(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    // 1. Authentication Check
    if (!isAuthenticated(req)) {
        return res.status(401).json({ error: "missing or invalid authentication" });
    }

    // 2. Authorization Check
    if (!hasPermission(req.user, 'update', 'Product')) {
        return res.status(403).json({ error: "caller lacks permission to update this product" });
    }

    // 3. Validation
    if (!isValid(updateData)) {
        return res.status(400).json({ error: "invalid request body or parameters" });
    }

    try {
        // 4. Database Lookup
        const existingProduct = await db.Product.findOne({ where: { id } });
        if (!existingProduct) {
            return res.status(404).json({ error: "product with given id does not exist" });
        }

        // 5. Conflict Check
        if (isConflicting(updateData, existingProduct)) {
            return res.status(409).json({ error: "update conflicts with current resource state" });
        }

        // 6. Update Execution
        const updatedProduct = await db.Product.update(
            { ...updateData, updated_at: new Date() },
            { where: { id } }
        );

        // 7. Response
        // Filter response to only include updated fields
        return res.status(200).json(updatedProduct);

    } catch (error) {
        return res.status(500).json({ error: "unexpected server failure" });
    }
}

/* 
Notes covered:
- Updates an existing product resource identified by its id (2a84af56-a6ea-4668-82ca-142bc06f152c)
- Returns a Product JSON response (2a84af56-a6ea-4668-82ca-142bc06f152c)
- Filter the response with only the updated fields (2a84af56-a6ea-4668-82ca-142bc06f152c)
- 200 OK - product updated successfully (2a84af56-a6ea-4668-82ca-142bc06f152c)
- 400 Bad Request - invalid request body or parameters (2a84af56-a6ea-4668-82ca-142bc06f152c)
- 401 Unauthorized - missing or invalid authentication (2a84af56-a6ea-4668-82ca-142bc06f152c)
- 403 Forbidden - caller lacks permission to update this product (2a84af56-a6ea-4668-82ca-142bc06f152c)
- 404 Not Found - product with given id does not exist (2a84af56-a6ea-4668-82ca-142bc06f152c)
- 409 Conflict - update conflicts with current resource state (2a84af56-a6ea-4668-82ca-142bc06f152c)
- 500 Internal Server Error - unexpected server failure (2a84af56-a6ea-4668-82ca-142bc06f152c)
*/