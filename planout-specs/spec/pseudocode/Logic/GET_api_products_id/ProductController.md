/**
 * Handles the incoming request to fetch a single product by its ID.
 * @param {Object} req - The request object containing the path parameter 'id'.
 * @param {Object} res - The response object.
 */
FUNCTION getProductById(req, res):
    // 1. Validate the ID format
    IF NOT isValidUuid(req.params.id) THEN
        RETURN res.status(400).json({ error: "Bad Request", message: "Invalid ID format" })
    END IF

    // 2. Authenticate the request
    IF NOT isAuthenticated(req) THEN
        RETURN res.status(401).json({ error: "Unauthorized", message: "Missing or invalid credentials" })
    END IF

    // 3. Fetch product from database
    TRY:
        product = Database.find("Product", { id: req.params.id })

        // 4. Handle missing product
        IF product IS NULL THEN
            RETURN res.status(404).json({ error: "Not Found", message: "Product does not exist" })
        END IF

        // 5. Return the product data
        RETURN res.status(200).json(product)

    CATCH error:
        // 6. Handle unexpected server errors
        LOG_ERROR(error)
        RETURN res.status(500).json({ error: "Internal Server Error", message: "An unexpected error occurred" })
    END TRY
END FUNCTION