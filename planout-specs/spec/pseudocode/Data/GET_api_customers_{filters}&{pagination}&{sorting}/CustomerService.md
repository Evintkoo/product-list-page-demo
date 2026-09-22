/**
 * Service layer to bridge the API controller and the Repository.
 */
class CustomerService {
  constructor(repository) {
    this.repository = repository;
  }

  async getCustomers(params) {
    // Validate business logic constraints
    if (!params.type) {
      throw new Error("INVALID_REQUEST: 'type' is required.");
    }

    // Execute repository search
    const result = await this.repository.findMany({
      type: params.type,
      filters: params.filters || {},
      page: parseInt(params.page) || 1,
      per_page: parseInt(params.per_page) || 20,
      sort: params.sort || 'created_at',
      order: params.order || 'asc'
    });

    return {
      items: result.data,
      meta: {
        total: result.total,
        page: params.page,
        per_page: params.per_page
      }
    };
  }
}