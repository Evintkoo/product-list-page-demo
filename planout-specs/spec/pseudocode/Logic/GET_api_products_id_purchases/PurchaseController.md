/**
 * Node: GET /api/products/:id/purchases (6a5269da-4edf-4c5f-886a-99934e7c2145)
 * Previous: Query Parameters Shape (3782a91e-b716-4e39-855b-43907c107337)
 */
async function getProductPurchases(req, res) {
  // 1. Authentication & Authorization
  if (!req.isAuthenticated()) {
    return res.status(401).send({ error: "Unauthorized" }); // Transition: 401 Unauthorized
  }
  
  if (!req.user.hasPermission('view_product_purchases')) {
    return res.status(403).send({ error: "Forbidden" }); // Transition: 403 Forbidden
  }

  // 2. Input Validation
  const { id } = req.params;
  const { supplier_id_eq, s, page_rows } = req.query;

  if (isNaN(parseInt(supplier_id_eq)) || (page_rows && isNaN(parseInt(page_rows)))) {
    return res.status(400).send({ error: "Malformed query parameters" }); // Transition: 400 Bad Request
  }

  // 3. Resource Existence Check
  const product = await db.Product.findOne({ where: { id: id } });
  if (!product) {
    return res.status(404).send({ error: "Product not found" }); // Transition: 404 Not Found
  }

  // 4. Data Retrieval & Filtering
  try {
    const queryOptions = {
      where: { product_id: id },
      order: parseSort(s) // <!-- MISSING_FIELD: Purchase.sort_logic -->
    };

    if (supplier_id_eq) {
      queryOptions.where.supplier_id = supplier_id_eq;
    }

    const purchases = await db.Purchase.findAll(queryOptions);
    return res.status(200).json(purchases);
  } catch (err) {
    // Handle validation errors (e.g. type mismatch in filters)
    return res.status(422).send({ errors: err.message }); // Transition: 422 Unprocessable Entity
  }
}

/**
 * Rate Limiting (Global Middleware)
 * Transition: 429 Too Many Requests
 */
function rateLimitHandler(req, res, next) {
  if (isOverLimit(req)) {
    return res.status(429).send({ error: "Too Many Requests" });
  }
  next();
}

/* 
Notes covered:
- Endpoint retrieves and filters purchase history for a specific product.
- Accepts product id as path parameter.
- Accepts optional query parameters: supplier_id_eq, s (sort), page_rows.
- 200 OK: returns purchase history records.
- 400 Bad Request: malformed query parameters.
- 401 Unauthorized: missing/invalid authentication.
- 403 Forbidden: lacks permission.
- 404 Not Found: product id does not exist.
- 422 Unprocessable Entity: filter values fail validation.
- 429 Too Many Requests: rate limit exceeded.
- 500 Internal Server Error: unexpected failure.
*/