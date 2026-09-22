/**
 * Fetches a paginated list of history records for a specific supplier.
 * Ensures the supplier belongs to the authenticated user's company.
 */
function getSupplierHistory(
  supplierId: UUID,
  companyId: UUID,
  page: number = 1,
  limit: number = 20
): PaginatedResult<SupplierHistory> {
  
  // 1. Verify supplier existence and ownership
  const supplier = db.Supplier.findFirst({
    where: { 
      id: supplierId,
      company_id: companyId 
    }
  });

  if (!supplier) {
    throw new NotFoundError("Supplier not found or access denied");
  }

  // 2. Calculate offset for pagination
  const offset = (page - 1) * limit;

  // 3. Query history records ordered by newest first
  const historyRecords = db.SupplierHistory.findMany({
    where: { supplier_id: supplierId },
    orderBy: { changed_at: "desc" },
    skip: offset,
    take: limit
  });

  // 4. Get total count for pagination metadata
  const totalCount = db.SupplierHistory.count({
    where: { supplier_id: supplierId }
  });

  return {
    data: historyRecords,
    meta: {
      total: totalCount,
      page: page,
      limit: limit,
      totalPages: Math.ceil(totalCount / limit)
    }
  };
}