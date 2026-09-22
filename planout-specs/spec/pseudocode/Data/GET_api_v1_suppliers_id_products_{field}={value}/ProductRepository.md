/**
 * Data access layer for retrieving filtered products associated with a specific supplier.
 */
class ProductRepository {
  
  /**
   * Fetches a paginated list of products for a given supplier, applying dynamic filters.
   * 
   * @param supplierId - The UUID of the supplier.
   * @param filters - An object containing optional search criteria (sku, name, discount_percent).
   * @param pagination - An object containing page and per_page settings.
   * @returns A promise resolving to an array of Product entities.
   */
  async findBySupplier(supplierId, filters, pagination) {
    // 1. Verify Supplier existence
    const supplierExists = await db.table('Supplier').where({ id: supplierId }).first();
    if (!supplierExists) {
      throw new Error('SUPPLIER_NOT_FOUND');
    }

    // 2. Build base query
    let query = db.table('Product').where({ supplier_id: supplierId });

    // 3. Apply dynamic filters
    if (filters.sku) {
      query = query.where('sku', 'ILIKE', `%${filters.sku}%`);
    }
    
    if (filters.name) {
      query = query.where('name', 'ILIKE', `%${filters.name}%`);
    }

    if (filters.discount_percent !== undefined) {
      query = query.where('discount_percent', filters.discount_percent);
    }

    // 4. Apply pagination
    const offset = (pagination.page - 1) * pagination.per_page;
    query = query.limit(pagination.per_page).offset(offset);

    // 5. Execute and return
    return await query.select('*');
  }
}

export default new ProductRepository();