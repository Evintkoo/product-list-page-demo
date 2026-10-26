/**
 * Node: GET /api/products/:id (ID: 30e684ef-480d-4d5e-a42b-e6243935b114)
 * Description: Fetch the product details based on the given ID.
 */
async function getProductById(req, res) {
    const { id } = req.params;

    // 1. Validation: Check if ID is malformed
    if (!isValidUuid(id)) {
        return res.status(400).json({ 
            error: "Bad Request", 
            message: "The provided ID is malformed or invalid." 
        });
    }

    // 2. Authentication Check
    if (!req.isAuthenticated()) {
        // Transition: "401 Unauthorized" to 401 Unauthorized JSON Schema
        return res.status(401).json({ 
            error: "Unauthorized", 
            message: "Missing or invalid authentication credentials." 
        });
    }

    try {
        // 3. Data Retrieval
        const product = await db.Product.findUnique({
            where: { id: id }
        });

        // 4. Handle Not Found
        if (!product) {
            // Transition: "404 Not Found" to 404 Not Found JSON Schema
            return res.status(404).json({ 
                error: "Not Found", 
                message: "No product exists with the given ID.",
                resource: "Product"
            });
        }

        // 5. Happy Path: Return product details
        // Transition: "product details JSON Schema" to Data
        return res.status(200).json(product);

    } catch (error) {
        // 6. Handle Server Error
        // Transition: "500 Internal Server Error" to 500 Internal Server Error JSON schema
        return res.status(500).json({ 
            error: "Internal Server Error", 
            message: "An unexpected server error occurred." 
        });
    }
}

/**
 * Notes covered:
 * - Fetch the product details based on the given ID (30e684ef-480d-4d5e-a42b-e6243935b114)
 * - Return the product details JSON Schema (30e684ef-480d-4d5e-a42b-e6243935b114)
 * - 400 Bad Request - the provided ID is malformed or invalid (30e684ef-480d-4d5e-a42b-e6243935b114)
 * - 401 Unauthorized - missing or invalid authentication credentials (30e684ef-480d-4d5e-a42b-e6243935b114)
 * - 404 Not Found - no product exists with the given ID (30e684ef-480d-4d5e-a42b-e6243935b114)
 * - 500 Internal Server Error - an unexpected server error occurred (30e684ef-480d-4d5e-a42b-e6243935b114)
 */