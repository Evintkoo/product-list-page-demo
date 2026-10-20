/**
 * Fetches filtered and sorted purchase records for a specific product.
 * 
 * @param {string} productId - The ID of the product to filter by.
 * @param {Object} filters - The filter criteria.
 * @param {number} [filters.supplier_id_eq] - Optional filter for supplier.
 * @param {string|string[]} [filters.s] - Sorting criteria (e.g., "purchase_date desc").
 * @param {number} [pageRows] - Pagination limit.
 */
function getPurchasesByProduct(productId, filters, pageRows) {
  // 1. Validate existence of Product
  const product = db.Product.findUnique({ where: { id: productId } });
  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  // 2. Build query
  let query = {
    where: {
      product_id: productId
    }
  };

  // 3. Apply optional supplier filter
  if (filters.supplier_id_eq) {
    query.where.supplier_id = filters.supplier_id_eq;
  }

  // 4. Apply sorting
  if (filters.s) {
    query.orderBy = parseSortParameters(filters.s);
  }

  // 5. Apply pagination
  if (pageRows) {
    query.take = pageRows;
  }

  // 6. Execute query
  return db.Purchase.findMany(query);
}

/**
 * Helper to convert query string sort parameters into database order objects.
 * Expected format: ["field_name direction"]
 */
function parseSortParameters(sortParams) {
  const sortArray = Array.isArray(sortParams) ? sortParams : [sortParams];
  return sortArray.map(param => {
    const [field, direction] = param.split(' ');
    return { [field]: direction || 'asc' };
  });
}