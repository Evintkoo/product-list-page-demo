/**
 * Fetches paginated stock outgoings with optional filtering.
 * Maps raw database entities to the UI-friendly table format.
 */
function getStockOutgoings(filters: { page: number, limit: number, search?: string, status?: string }) {
    // Query StockOutgoing entity with pagination and filters
    const rawData = database.StockOutgoing.findMany({
        where: {
            reference_number: { contains: filters.search },
            status: filters.status
        },
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit,
        orderBy: { created_at: 'desc' }
    });

    // Map to UI Table Schema
    return rawData.map(item => ({
        id: item.id,
        // Mapping logic as per requirements
        ref_code: item.reference_number, <!-- MISSING_FIELD: StockOutgoing.ref_code -->
        supplier_ref_code: item.reference_number, <!-- MISSING_FIELD: StockOutgoing.supplier_ref_code -->
        created_at: item.created_at,
        due_at: null, <!-- MISSING_FIELD: StockOutgoing.due_at -->
        entity_name: null, <!-- MISSING_FIELD: StockOutgoing.entity_name -->
        source_name: null, <!-- MISSING_FIELD: StockOutgoing.source_name -->
        workflow_state: item.status, <!-- MISSING_FIELD: StockOutgoing.workflow_state -->
        updater_name: null <!-- MISSING_FIELD: StockOutgoing.updater_name -->
    }));
}