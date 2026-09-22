FUNCTION fetchFilteredProducts(filters):
    // Build query based on provided filters
    SET query = Product.query()

    IF filters.status:
        query.where("status", filters.status)
    IF filters.sku_cont:
        query.whereLike("sku", filters.sku_cont)
    IF filters.name_cont:
        query.whereLike("name", filters.name_cont)
    IF filters.product_code_cont:
        query.whereLike("product_code", filters.product_code_cont)
    IF filters.product_brand_id_eq:
        query.where("product_brand_id", filters.product_brand_id_eq)
    IF filters.product_type_id_eq:
        query.where("product_type_id", filters.product_type_id_eq)
    
    // Handle Tag filtering via join
    IF filters.product_tags_id_in:
        query.join("ProductTag", "Product.id", "=", "ProductTag.product_id")
        query.whereIn("ProductTag.tag_id", filters.product_tags_id_in)

    // Apply Pagination
    SET offset = (filters.page - 1) * filters.rows
    query.limit(filters.rows).offset(offset)

    RETURN query.execute()