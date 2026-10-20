/**
 * Service for executing complex queries against the Product entity.
 */
function search(filters) {
    // Verify existence of foreign keys if provided
    if (filters.brand_id && !ProductBrand.exists(filters.brand_id)) throw new NotFoundError("Brand not found");
    if (filters.type_id && !ProductType.exists(filters.type_id)) throw new NotFoundError("Type not found");
    if (filters.tax_id && !Tax.exists(filters.tax_id)) throw new NotFoundError("Tax not found");
    
    if (filters.tag_ids) {
        filters.tag_ids.forEach(id => {
            if (!Tag.exists(id)) throw new NotFoundError("Tag not found");
        });
    }

    // Build Query
    let query = Product.query();

    if (filters.sku) query.where("sku", "LIKE", `%${filters.sku}%`);
    if (filters.name) query.where("name", "LIKE", `%${filters.name}%`);
    if (filters.product_code) query.where("product_code", "LIKE", `%${filters.product_code}%`);
    if (filters.brand_id) query.where("product_brand_id", filters.brand_id);
    if (filters.type_id) query.where("product_type_id", filters.type_id);
    if (filters.tax_id) query.where("tax_id", filters.tax_id);
    
    if (filters.tag_ids) {
        query.whereIn("id", ProductTag.select("product_id").whereIn("tag_id", filters.tag_ids));
    }

    if (filters.info_1) query.where("info_1", "LIKE", `%${filters.info_1}%`);
    if (filters.info_2) query.where("info_2", "LIKE", `%${filters.info_2}%`);
    if (filters.info_3) query.where("info_3", "LIKE", `%${filters.info_3}%`);

    // Apply Sorting and Pagination
    if (filters.sort) query.orderBy(filters.sort);
    if (filters.limit) query.limit(filters.limit);

    return query.execute();
}