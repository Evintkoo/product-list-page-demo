/**
 * Data access layer for Product search operations.
 * Translates query parameters into database filter criteria.
 */
class ProductRepository {
  
  /**
   * Executes a filtered search against the Product entity.
   * @param filters - The parsed 'q' object from the API request
   * @param limit - The 'page_rows' parameter for pagination
   */
  async findProducts(filters: ProductQueryFilters, limit: number) {
    let query = Database.table('Product').select('*');

    // Apply string containment filters
    if (filters.sku_cont) query.where('sku', 'LIKE', `%${filters.sku_cont}%`);
    if (filters.name_cont) query.where('name', 'LIKE', `%${filters.name_cont}%`);
    if (filters.product_code_cont) query.where('product_code', 'LIKE', `%${filters.product_code_cont}%`);
    if (filters.info_1_cont) query.where('info_1', 'LIKE', `%${filters.info_1_cont}%`);
    if (filters.info_2_cont) query.where('info_2', 'LIKE', `%${filters.info_2_cont}%`);
    if (filters.info_3_cont) query.where('info_3', 'LIKE', `%${filters.info_3_cont}%`);

    // Apply exact match filters
    if (filters.product_brand_id_eq) query.where('product_brand_id', '=', filters.product_brand_id_eq);
    if (filters.product_type_id_eq) query.where('product_type_id', '=', filters.product_type_id_eq);
    if (filters.tax_id_eq) query.where('tax_id', '=', filters.tax_id_eq);

    // Apply relational filters (Tags)
    if (filters.product_tags_id_in && filters.product_tags_id_in.length > 0) {
      query.whereIn('id', 
        Database.table('ProductTag')
          .select('product_id')
          .whereIn('tag_id', filters.product_tags_id_in)
      );
    }

    // Apply sorting
    if (filters.s) {
      const sortParams = Array.isArray(filters.s) ? filters.s : [filters.s];
      sortParams.forEach(param => {
        const [field, direction] = param.split(' ');
        query.orderBy(field, direction || 'asc');
      });
    }

    // Apply pagination
    if (limit) {
      query.limit(limit);
    }

    return await query.execute();
  }
}