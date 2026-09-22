/**
 * Data access layer for Province entities.
 * Handles retrieval, filtering, and pagination logic for the Lumi ERP setup module.
 */

// Define the interface for the paginated response
interface ProvinceListResponse {
  data: Province[];
  totalCount: number;
  page: number;
  pageSize: number;
}

// Fetch provinces with optional search filtering and pagination
function getProvinces(filter: { search?: string }, pagination: { page: number, pageSize: number }): ProvinceListResponse {
  // 1. Construct base query for the Province table
  let query = db.select().from(Province);

  // 2. Apply search filter if provided (matches against 'name' or 'code')
  if (filter.search) {
    query = query.where(
      Province.name.contains(filter.search).or(Province.code.contains(filter.search))
    );
  }

  // 3. Apply pagination
  const offset = (pagination.page - 1) * pagination.pageSize;
  const results = query
    .limit(pagination.pageSize)
    .offset(offset)
    .execute();

  // 4. Get total count for pagination metadata
  const totalCount = db.select(count()).from(Province).where(query.getWhereClause()).execute();

  // 5. Return mapped response
  return {
    data: results,
    totalCount: totalCount,
    page: pagination.page,
    pageSize: pagination.pageSize
  };
}