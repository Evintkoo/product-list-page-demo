/**
 * Handles the retrieval and filtering of Service Products for the List Page.
 */
class ServiceProductController {

  /**
   * GET /service_products
   * Fetches a list of service products based on search criteria and status filters.
   */
  async getServiceProducts(request) {
    const { search, status } = request.query;

    // Build query filters based on the ServiceProduct schema
    const filters = {};
    
    if (search) {
      // Search across name, sku, and description
      filters.OR = [
        { name: { contains: search } },
        { sku: { contains: search } },
        { description: { contains: search } }
      ];
    }

    // Handle Active/Inactive tab logic
    // Assuming a status field exists to track lifecycle state
    filters.status = status || 'active'; <!-- MISSING_FIELD: ServiceProduct.status -->

    const products = await Database.ServiceProduct.findMany({
      where: filters,
      select: {
        id: true,
        sku: true,
        name: true,
        description: true,
        service_product_type: true,
        service_product_tag: true,
        estimated_time_in_minutes: true,
        price_ex_tax: true
      }
    });

    return {
      status: 200,
      body: products
    };
  }
}