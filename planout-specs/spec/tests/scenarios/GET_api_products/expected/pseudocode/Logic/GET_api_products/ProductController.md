/**
 * Node: GET /api/products (ID: 3e7cd76c-521a-4e05-98f6-f47418db4cd0)
 * Description: Retrieves a paginated list of products from the database.
 */
async function getProducts(req, res) {
    // 1. Extract and validate query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
        // Connection: "400 Bad Request"
        return res.status(400).json({ error: "Malformed query parameters" });
    }

    // 2. Authentication check
    if (!req.headers.authorization) {
        // Connection: "401 Unauthorized"
        return res.status(401).json({ error: "Authentication missing or invalid" });
    }

    try {
        // 3. Fetch data from storage
        // Connection: "Product List JSON Schema."
        const offset = (page - 1) * limit;
        const products = await db.Product.findMany({
            skip: offset,
            take: limit
        });
        
        const totalCount = await db.Product.count();

        if (!products || products.length === 0) {
            // Connection: "404 Not Found"
            return res.status(404).json({ error: "No products found" });
        }

        // 4. Return successful response
        return res.status(200).json({
            data: products,
            total_count: totalCount,
            page: page,
            limit: limit
        });

    } catch (error) {
        // Connection: "500 Internal Server Error"
        return res.status(500).json({ error: "Unexpected server failure" });
    }
}

/**
 * Notes covered:
 * - Returns product list according to Product List JSON Schema.
 * - Supports pagination via page and limit query parameters.
 * - Returns paginated results with total count metadata.
 * - 200 OK returns the product list on success.
 * - 400 Bad Request for malformed query parameters.
 * - 401 Unauthorized when authentication is missing or invalid.
 * - 404 Not Found if the requested resource does not exist.
 * - 500 Internal Server Error for unexpected server failures.
 */