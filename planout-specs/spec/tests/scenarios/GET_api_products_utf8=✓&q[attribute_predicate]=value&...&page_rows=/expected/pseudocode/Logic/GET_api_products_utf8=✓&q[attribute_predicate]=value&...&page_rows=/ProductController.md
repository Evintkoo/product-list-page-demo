/**
 * Node: GET /api/products?&q[sku_cont]=&q[name_cont]=&q[product_code_cont]=&q[product_brand_id_eq]=26460&q[product_type_id_eq]=&q[tax_id_eq]=&q[product_tags_id_in][]=&q[info_1_cont]=&q[info_2_cont]=&q[info_3_cont]=&q[s]=name+asc&page_rows=
 * ID: 0e357bd6-b77c-47ad-be86-188c98ffed49
 */
async function searchProducts(req, res) {
  // 1. Authentication & Authorization Check
  if (!req.isAuthenticated()) {
    return res.status(401).send({ error: "Unauthorized" }); // Transition: 401 Unauthorized
  }
  if (!req.user.hasPermission('list_products')) {
    return res.status(403).send({ error: "Forbidden" }); // Transition: 403 Forbidden
  }

  // 2. Validate Query Parameters
  const { q, page_rows, utf8 } = req.query;
  try {
    // Validate types for q fields and page_rows
    // If validation fails:
    // return res.status(422).send({ errors: "Validation failed" }); // Transition: 422 Unprocessable Entity
    // If malformed:
    // return res.status(400).send({ error: "Malformed parameters" }); // Transition: 400 Bad Request
  } catch (e) {
    return res.status(500).send({ error: "Internal Server Error" }); // Transition: 500 Internal Server Error
  }

  // 3. Data Retrieval & Existence Check
  try {
    // Build query based on Product fields: sku, name, product_code, product_brand_id, product_type_id, tax_id, info_1, info_2, info_3
    // Check existence for foreign keys: Brand.id, ProductType.id, Tax.id, Tag.id
    // If any referenced ID does not exist:
    // return res.status(404).send({ error: "Resource not found" }); // Transition: 404 Not Found
    
    const products = await Product.find({
      where: {
        sku: q.sku_cont,
        name: q.name_cont,
        product_code: q.product_code_cont,
        product_brand_id: q.product_brand_id_eq,
        product_type_id: q.product_type_id_eq,
        tax_id: q.tax_id_eq,
        info_1: q.info_1_cont,
        info_2: q.info_2_cont,
        info_3: q.info_3_cont
      },
      limit: page_rows
    });

    return res.status(200).json(products); // Happy Path: 200 OK
  } catch (e) {
    // Handle Rate Limiting
    if (e.isRateLimited) {
      return res.status(429).send({ error: "Too Many Requests" }); // Transition: 429 Too Many Requests
    }
    return res.status(500).send({ error: "Internal Server Error" }); // Transition: 500 Internal Server Error
  }
}

/**
 * Notes covered:
 * - Endpoint used to search and filter product catalog.
 * - Accepts query filter parameters: SKU, name, product code, brand id, type id, tax id, tags, info_1, info_2, info_3.
 * - Accepts page_rows parameter.
 * - 200 OK: products matching filters returned.
 * - 400 Bad Request: malformed query parameters.
 * - 401 Unauthorized: missing/invalid authentication.
 * - 403 Forbidden: lacks permission to list products.
 * - 404 Not Found: referenced filter id does not exist.
 * - 422 Unprocessable Entity: filter values fail validation.
 * - 429 Too Many Requests: rate limit exceeded.
 * - 500 Internal Server Error: unexpected server-side failure.
 */