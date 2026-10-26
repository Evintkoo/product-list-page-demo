/**
 * Data access layer for Product search operations.
 * Receives sanitized filter criteria from the Logic layer.
 */

interface ProductQueryFilters {
  sku_cont?: string;
  name_cont?: string;
  product_code_cont?: string;
  product_brand_id_eq?: number;
  product_type_id_eq?: number;
  tax_id_eq?: number;
  product_tags_id_in?: number[];
  info_1_cont?: string;
  info_2_cont?: string;
  info_3_cont?: string;
  s?: string | string[];
  page_rows?: number;
}

export const findProducts = async (filters: ProductQueryFilters) => {
  // Implementation maps the 'q' object properties to database query clauses
  // 'cont' maps to SQL LIKE %value%
  // 'eq' maps to SQL =
  // 'in' maps to SQL IN (...)
  // 's' maps to ORDER BY clause
  // 'page_rows' maps to LIMIT clause
  
  return await db.products.findMany({
    where: {
      sku: filters.sku_cont ? { contains: filters.sku_cont } : undefined,
      name: filters.name_cont ? { contains: filters.name_cont } : undefined,
      product_code: filters.product_code_cont ? { contains: filters.product_code_cont } : undefined,
      product_brand_id: filters.product_brand_id_eq,
      product_type_id: filters.product_type_id_eq,
      tax_id: filters.tax_id_eq,
      tags: filters.product_tags_id_in ? { some: { id: { in: filters.product_tags_id_in } } } : undefined,
      info_1: filters.info_1_cont ? { contains: filters.info_1_cont } : undefined,
      info_2: filters.info_2_cont ? { contains: filters.info_2_cont } : undefined,
      info_3: filters.info_3_cont ? { contains: filters.info_3_cont } : undefined
    },
    orderBy: parseSort(filters.s),
    take: filters.page_rows
  });
};