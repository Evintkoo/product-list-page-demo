/**
 * Service layer to handle business rules and parameter normalization.
 */
class ProductTypeService {
  private repository = new ProductTypeRepository();

  async getProductTypes(params: { 
    q?: string, 
    page?: number, 
    rows?: number, 
    pagesize?: number, 
    pageLimit?: number 
  }) {
    // 1. Normalize pagination: rows takes precedence over pagesize/pageLimit
    const limit = params.rows ?? params.pagesize ?? params.pageLimit ?? 20;
    const page = params.page ?? 1;

    // 2. Validate business rules
    if (page < 1 || limit < 1) {
      throw new Error("INVALID_PAGINATION_PARAMETERS");
    }

    // 3. Fetch data
    const result = await this.repository.findMany(params.q ?? null, page, limit);

    // 4. Handle 404 case
    if (params.q && result.data.length === 0) {
      throw new Error("NOT_FOUND");
    }

    return result;
  }
}