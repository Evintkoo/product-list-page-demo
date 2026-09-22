/**
 * Service layer to interact with the database schema.
 */
function search(criteria) {
    // Build query dynamically based on provided criteria
    let query = Database.table('Product');

    if (criteria.sku) query.where('sku', 'LIKE', `%${criteria.sku}%`);
    if (criteria.name) query.where('name', 'LIKE', `%${criteria.name}%`);
    if (criteria.product_code) query.where('product_code', 'LIKE', `%${criteria.product_code}%`);
    if (criteria.product_brand_id) query.where('product_brand_id', '=', criteria.product_brand_id);
    if (criteria.product_type_id) query.where('product_type_id', '=', criteria.product_type_id);
    if (criteria.tax_id) query.where('tax_id', '=', criteria.tax_id);
    
    // Handle Tag filtering via join
    if (criteria.tag_ids) {
        query.join('ProductTag', 'Product.id', '=', 'ProductTag.product_id')
             .whereIn('ProductTag.tag_id', criteria.tag_ids);
    }

    if (criteria.info_1) query.where('info_1', 'LIKE', `%${criteria.info_1}%`);
    if (criteria.info_2) query.where('info_2', 'LIKE', `%${criteria.info_2}%`);
    if (criteria.info_3) query.where('info_3', 'LIKE', `%${criteria.info_3}%`);

    return query.orderBy(criteria.sort).limit(criteria.limit).fetchAll();
}