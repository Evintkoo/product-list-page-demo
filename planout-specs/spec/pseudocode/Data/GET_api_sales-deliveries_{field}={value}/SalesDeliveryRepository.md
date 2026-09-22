/**
 * Data access layer for SalesDelivery entities.
 * Handles dynamic filtering based on the provided query parameters.
 */
class SalesDeliveryRepository {
  
  /**
   * Finds sales deliveries based on a dynamic filter object.
   * Maps API query parameters to database columns.
   */
  async findByFilter(filters: {
    sales_delivery?: string,
    reference_no?: string,
    sales_order?: string,
    sales_invoice?: string,
    customer?: string,
    warehouse?: string,
    from_date?: string,
    to_date?: string,
    status?: string
  }) {
    // Initialize base query
    let query = db.table('SalesDelivery');

    // Apply dynamic filters
    if (filters.reference_no) {
      query = query.where('reference_no', '=', filters.reference_no);
    }
    
    if (filters.sales_order) {
      query = query.where('sales_order_id', '=', filters.sales_order);
    }

    if (filters.sales_invoice) {
      query = query.where('sales_invoice_id', '=', filters.sales_invoice);
    }

    if (filters.customer) {
      query = query.where('customer_id', '=', filters.customer);
    }

    if (filters.warehouse) {
      query = query.where('warehouse_id', '=', filters.warehouse);
    }

    if (filters.status) {
      query = query.where('status', '=', filters.status);
    }

    // Date range filtering
    if (filters.from_date) {
      query = query.where('delivery_date', '>=', filters.from_date);
    }
    
    if (filters.to_date) {
      query = query.where('delivery_date', '<=', filters.to_date);
    }

    // Execute query
    const results = await query.execute();
    
    return results;
  }
}