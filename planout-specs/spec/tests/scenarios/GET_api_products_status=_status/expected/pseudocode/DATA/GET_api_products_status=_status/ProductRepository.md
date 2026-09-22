/**
 * Fetches a paginated list of products based on dynamic filters.
 * 
 * @param filters - Object containing query parameters:
 *   - status: "active" | "inactive"
 *   - sku_cont: partial match for SKU
 *   - name_cont: partial match for name
 *   - product_code_cont: partial match for product code
 *   - product_brand_id_eq: exact match for brand ID
 *   - product_type_id_eq: exact match for type ID
 *   - product_tags_id_in: array of tag IDs
 * @param pagination - { page: number, rows: number }
 */
FUNCTION findProducts(filters, pagination):
    QUERY = SELECT * FROM Product
    
    // Apply Status Filter (Mandatory)
    QUERY = QUERY.WHERE(status == filters.status)
    
    // Apply Optional Filters
    IF filters.sku_cont IS NOT NULL:
        QUERY = QUERY.WHERE(sku LIKE %filters.sku_cont%)
    
    IF filters.name_cont IS NOT NULL:
        QUERY = QUERY.WHERE(name LIKE %filters.name_cont%)
        
    IF filters.product_code_cont IS NOT NULL:
        QUERY = QUERY.WHERE(product_code LIKE %filters.product_code_cont%)
        
    IF filters.product_brand_id_eq IS NOT NULL:
        QUERY = QUERY.WHERE(product_brand_id == filters.product_brand_id_eq)
        
    IF filters.product_type_id_eq IS NOT NULL:
        QUERY = QUERY.WHERE(product_type_id == filters.product_type_id_eq)
        
    IF filters.product_tags_id_in IS NOT NULL AND filters.product_tags_id_in.length > 0:
        QUERY = QUERY.JOIN(ProductTag).WHERE(tag_id IN filters.product_tags_id_in)
    
    // Apply Pagination
    OFFSET = (filters.page - 1) * filters.rows
    QUERY = QUERY.LIMIT(filters.rows).OFFSET(OFFSET)
    
    RETURN QUERY.EXECUTE()