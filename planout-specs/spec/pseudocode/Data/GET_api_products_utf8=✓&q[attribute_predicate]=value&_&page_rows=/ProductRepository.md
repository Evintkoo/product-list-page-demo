/**
 * Data access layer for Product search operations.
 * Translates query parameters into database filter criteria.
 */
function findProducts(filters: QueryParams, limit: number) {
  let query = Database.table("Product").select("*");

  // Apply string containment filters
  if (filters.q.sku_cont) query.where("sku", "LIKE", `%${filters.q.sku_cont}%`);
  if (filters.q.name_cont) query.where("name", "LIKE", `%${filters.q.name_cont}%`);
  if (filters.q.product_code_cont) query.where("product_code", "LIKE", `%${filters.q.product_code_cont}%`);
  if (filters.q.info_1_cont) query.where("info_1", "LIKE", `%${filters.q.info_1_cont}%`);
  if (filters.q.info_2_cont) query.where("info_2", "LIKE", `%${filters.q.info_2_cont}%`);
  if (filters.q.info_3_cont) query.where("info_3", "LIKE", `%${filters.q.info_3_cont}%`);

  // Apply exact match filters
  if (filters.q.product_brand_id_eq) {
    validateExists("ProductBrand", filters.q.product_brand_id_eq);
    query.where("product_brand_id", "=", filters.q.product_brand_id_eq);
  }
  if (filters.q.product_type_id_eq) {
    validateExists("ProductType", filters.q.product_type_id_eq);
    query.where("product_type_id", "=", filters.q.product_type_id_eq);
  }
  if (filters.q.tax_id_eq) {
    validateExists("Tax", filters.q.tax_id_eq);
    query.where("tax_id", "=", filters.q.tax_id_eq);
  }

  // Apply tag inclusion filter
  if (filters.q.product_tags_id_in) {
    query.whereIn("id", 
      Database.table("ProductTag")
        .select("product_id")
        .whereIn("tag_id", filters.q.product_tags_id_in)
    );
  }

  // Apply sorting
  if (filters.q.s) {
    const sortParams = Array.isArray(filters.q.s) ? filters.q.s : [filters.q.s];
    sortParams.forEach(param => {
      const [column, direction] = param.split(" ");
      query.orderBy(column, direction || "ASC");
    });
  }

  // Apply pagination limit
  if (limit) {
    query.limit(limit);
  }

  return query.execute();
}

function validateExists(entityName: string, id: number) {
  const exists = Database.table(entityName).where("id", "=", id).exists();
  if (!exists) {
    throw new NotFoundError(`${entityName} with id ${id} not found`);
  }
}