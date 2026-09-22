/**
 * Data access layer for Payment Type Mappings.
 * Handles the retrieval of mappings with joined display names for UI consumption.
 */

interface PaymentTypeMappingQueryFilters {
  company_id: string;
  store_id?: string | null;
  payment_type_id?: string | null;
  is_active?: boolean | null;
  limit: number;
  offset: number;
}

export const getPaymentTypeMappings = async (filters: PaymentTypeMappingQueryFilters) => {
  const query = `
    SELECT 
      ptm.payment_type_mapping_id, 
      s.name AS store_name, 
      pt.name AS payment_type_name, 
      ptm.is_active 
    FROM payment_type_mappings ptm 
    JOIN stores s ON s.store_id = ptm.store_id 
    JOIN payment_types pt ON pt.payment_type_id = ptm.payment_type_id 
    WHERE ptm.company_id = :company_id 
      AND (:store_id IS NULL OR ptm.store_id = :store_id) 
      AND (:payment_type_id IS NULL OR ptm.payment_type_id = :payment_type_id) 
      AND (:is_active IS NULL OR ptm.is_active = :is_active) 
    ORDER BY ptm.created_at ASC 
    LIMIT :limit OFFSET :offset;
  `;

  return await database.execute(query, {
    company_id: filters.company_id,
    store_id: filters.store_id || null,
    payment_type_id: filters.payment_type_id || null,
    is_active: filters.is_active ?? null,
    limit: filters.limit,
    offset: filters.offset
  });
};