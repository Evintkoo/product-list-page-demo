/**
 * Logic layer for managing Service Product data state
 */
class ServiceProductService {
  
  /**
   * Transforms raw database entities into UI-ready models
   */
  formatForTable(data) {
    return data.map(item => ({
      id: item.id,
      sku: item.sku,
      name: item.name,
      type: item.service_product_type,
      tag: item.service_product_tag,
      duration: `${item.estimated_time_in_minutes} mins`,
      price: item.price_ex_tax
    }));
  }
}