/**
 * Node: GET /api/products/:id/stocks (ID: e6d83974-67d5-4c68-bcb6-ad8583d89089)
 * Description: Returns current stock levels for a specific product by its ID. 
 * Used to check inventory availability before allowing a purchase or updating cart quantities.
 */
async function getProductStocks(req, res) {
    const { id } = req.params;

    // 1. Validation: Check if product ID format is valid
    if (!isValidUuid(id)) {
        // Transition: "400 Bad Request — invalid product ID format"
        return res.status(400).json({ error: "Invalid product ID format" });
    }

    // 2. Authentication: Verify credentials
    if (!isAuthenticated(req)) {
        // Transition: "401 Unauthorized — missing or invalid auth credentials"
        return res.status(401).json({ error: "Missing or invalid auth credentials" });
    }

    try {
        // 3. Data Retrieval: Fetch Product
        const product = await db.Product.findOne({ where: { id: id } });
        
        if (!product) {
            // Transition: "404 Not Found — product does not exist"
            return res.status(404).json({ error: "Product does not exist" });
        }

        // 4. Data Retrieval: Fetch Stock
        const stocks = await db.Stock.findAll({ where: { product_id: id } });

        // 5. Success: Return stock data
        // Transition: "200 OK — stock data returned successfully"
        return res.status(200).json(stocks);

    } catch (error) {
        // 6. Error: Unexpected server failure
        // Transition: "500 Internal Server Error — unexpected server failure"
        return res.status(500).json({ error: "Unexpected server failure" });
    }
}

/*
Notes covered:
- Returns current stock levels for a specific product by its ID.
- Used to check inventory availability before allowing a purchase or updating cart quantities.
- 200 OK — stock data returned successfully.
- 400 Bad Request — invalid product ID format.
- 401 Unauthorized — missing or invalid auth credentials.
- 404 Not Found — product does not exist.
- 500 Internal Server Error — unexpected server failure.
*/