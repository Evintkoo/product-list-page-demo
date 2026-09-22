/**
 * Service layer to execute database queries for PaymentTypeMapping.
 */
FUNCTION FETCH_PAYMENT_TYPE_MAPPINGS(company_id, store_id, payment_type_id, is_active, limit, offset):
    // Execute SQL Query
    // JOINs PaymentTypeMapping with Store and PaymentType to resolve display names
    SET query = "SELECT ptm.payment_type_mapping_id, s.name AS store_name, pt.name AS payment_type_name, ptm.is_active 
                 FROM payment_type_mappings ptm 
                 JOIN stores s ON s.store_id = ptm.store_id 
                 JOIN payment_types pt ON pt.payment_type_id = ptm.payment_type_id 
                 WHERE ptm.company_id = :company_id 
                 AND (:store_id IS NULL OR ptm.store_id = :store_id) 
                 AND (:payment_type_id IS NULL OR ptm.payment_type_id = :payment_type_id) 
                 AND (:is_active IS NULL OR ptm.is_active = :is_active) 
                 ORDER BY ptm.created_at ASC 
                 LIMIT :limit OFFSET :offset"
    
    SET data = DATABASE.EXECUTE(query, {company_id, store_id, payment_type_id, is_active, limit, offset})
    
    // Fetch total count for metadata
    SET total_count = DATABASE.EXECUTE("SELECT COUNT(*) FROM payment_type_mappings WHERE company_id = :company_id", {company_id})
    
    RETURN {
        "data": data,
        "total_count": total_count
    }