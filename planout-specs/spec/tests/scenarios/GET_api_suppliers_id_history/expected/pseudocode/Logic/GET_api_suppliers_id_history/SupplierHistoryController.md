/**
 * Logic for retrieving the audit trail of a specific supplier.
 */
function getSupplierHistory(request, response) {
    const supplierId = request.params.id;
    const authenticatedCompanyId = request.user.company_id; <!-- MISSING_FIELD: User.company_id -->
    
    // Pagination defaults
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 20;
    const offset = (page - 1) * limit;

    // 1. Verify Supplier exists and belongs to the authenticated user's company
    const supplier = database.Supplier.findOne({
        where: {
            id: supplierId,
            company_id: authenticatedCompanyId
        }
    });

    if (!supplier) {
        return response.status(404).json({ error: "Supplier not found or access denied." });
    }

    // 2. Fetch paginated history
    // Ordered by changed_at descending (newest to oldest)
    const history = database.SupplierHistory.findMany({
        where: { supplier_id: supplierId },
        orderBy: { changed_at: "desc" },
        skip: offset,
        take: limit
    });

    // 3. Return the result set
    return response.status(200).json(history);
}