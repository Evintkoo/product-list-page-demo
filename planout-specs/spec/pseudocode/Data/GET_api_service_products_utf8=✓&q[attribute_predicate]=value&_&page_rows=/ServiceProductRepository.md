/**
 * Handles data retrieval for Service Products with support for Ransack-style filtering.
 */
class ServiceProductRepository {
  
  /**
   * Fetches a paginated list of ServiceProducts based on dynamic filter criteria.
   * 
   * @param filters - Object containing:
   *   - sku_cont: string (partial match)
   *   - name_cont: string (partial match)
   *   - service_product_type_id_eq: uuid
   *   - service_product_tags_id_in: array of uuids
   * @param sort - Sorting criteria (e.g., "name asc")
   * @param limit - Number of records per page
   */
  async findFiltered(filters, sort, limit) {
    let query = Database.table("ServiceProduct");

    // Apply filters
    if (filters.sku_cont) {
      query = query.where("sku", "LIKE", `%${filters.sku_cont}%`);
    }
    
    if (filters.name_cont) {
      query = query.where("name", "LIKE", `%${filters.name_cont}%`);
    }

    if (filters.service_product_type_id_eq) {
      // Validate existence of Type
      const typeExists = await Database.table("ServiceProductType")
        .where("id", filters.service_product_type_id_eq).exists();
      
      if (!typeExists) throw new Error("NOT_FOUND: ServiceProductType");
      query = query.where("service_product_type_id", filters.service_product_type_id_eq);
    }

    if (filters.service_product_tags_id_in?.length > 0) {
      // Validate existence of Tags
      const tagsExist = await Database.table("ServiceProductTag")
        .whereIn("id", filters.service_product_tags_id_in).count() === filters.service_product_tags_id_in.length;
      
      if (!tagsExist) throw new Error("NOT_FOUND: ServiceProductTag");

      query = query.whereExists(
        Database.table("ServiceProductTagging")
          .whereRaw("ServiceProductTagging.service_product_id = ServiceProduct.id")
          .whereIn("service_product_tag_id", filters.service_product_tags_id_in)
      );
    }

    // Apply sorting
    if (sort) {
      const [column, direction] = sort.split(" ");
      query = query.orderBy(column, direction || "asc");
    }

    // Apply pagination
    return await query.limit(limit).execute();
  }
}