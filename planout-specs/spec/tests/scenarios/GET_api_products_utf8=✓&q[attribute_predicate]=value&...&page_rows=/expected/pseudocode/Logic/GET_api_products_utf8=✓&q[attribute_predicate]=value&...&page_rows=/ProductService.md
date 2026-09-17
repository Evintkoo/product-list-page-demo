/**
 * Logic layer for Product data access.
 */
const ProductService = {
    search: (filters, limit) => {
        // Build query based on provided filters
        let query = DB.table('Product');

        if (filters.sku_cont) query.where('sku', 'LIKE', `%${filters.sku_cont}%`);
        if (filters.name_cont) query.where('name', 'LIKE', `%${filters.name_cont}%`);
        if (filters.product_code_cont) query.where('product_code', 'LIKE', `%${filters.product_code_cont}%`);
        
        if (filters.product_brand_id_eq) query.where('product_brand_id', '=', filters.product_brand_id_eq);
        if (filters.product_type_id_eq) query.where('product_type_id', '=', filters.product_type_id_eq);
        if (filters.tax_id_eq) query.where('tax_id', '=', filters.tax_id_eq);

        if (filters.info_1_cont) query.where('info_1', 'LIKE', `%${filters.info_1_cont}%`);
        if (filters.info_2_cont) query.where('info_2', 'LIKE', `%${filters.info_2_cont}%`);
        if (filters.info_3_cont) query.where('info_3', 'LIKE', `%${filters.info_3_cont}%`);

        // Handle Tag filtering via join
        if (filters.product_tags_id_in && filters.product_tags_id_in.length > 0) {
            query.join('ProductTag', 'Product.id', '=', 'ProductTag.product_id')
                 .whereIn('ProductTag.tag_id', filters.product_tags_id_in);
        }

        return query.limit(limit).execute();
    }
};