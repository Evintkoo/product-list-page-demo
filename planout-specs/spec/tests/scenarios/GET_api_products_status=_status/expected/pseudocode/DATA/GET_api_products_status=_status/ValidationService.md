/**
 * Validates existence of foreign keys before query execution
 */
FUNCTION validateFilterReferences(filters):
    IF filters.product_brand_id_eq AND NOT EXISTS(SELECT 1 FROM Brand WHERE id == filters.product_brand_id_eq):
        THROW "404 Not Found: Brand ID does not exist"
        
    IF filters.product_type_id_eq AND NOT EXISTS(SELECT 1 FROM Type WHERE id == filters.product_type_id_eq):
        THROW "404 Not Found: Type ID does not exist"
        
    IF filters.product_tags_id_in:
        FOR tag_id IN filters.product_tags_id_in:
            IF NOT EXISTS(SELECT 1 FROM Tag WHERE id == tag_id):
                THROW "404 Not Found: Tag ID does not exist"