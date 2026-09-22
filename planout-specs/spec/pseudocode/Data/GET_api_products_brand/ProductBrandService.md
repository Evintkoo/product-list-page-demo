/**
 * Orchestrates data retrieval and parameter normalization.
 */
function fetchBrandList(params: any) {
  // Normalize pagination parameters
  // Precedence: rows > pagesize > pageLimit
  const rows = params.rows || params.pagesize || params.pageLimit || 20;
  const page = params.page || 1;

  // Validate constraints
  if (page < 1 || rows < 1) {
    throw new Error("INVALID_PARAMETERS");
  }

  // Fetch data
  const data = getProductBrands({ q: params.q, page, rows });
  
  // Handle 404 if search was provided but no results found
  if (params.q && data.length === 0) {
    return null;
  }

  return {
    data,
    meta: {
      page,
      rows,
      total: countProductBrands(params.q)
    }
  };
}