/**
 * Fetches a paginated list of stock outgoings from the backend.
 * Supports filtering and sorting as defined by the UI requirements.
 */
FUNCTION getStockOutgoings(params: { 
    page: number, 
    pageSize: number, 
    sortBy: string, 
    sortOrder: 'asc' | 'desc',
    filters: {
        reference_number?: string,
        status?: string,
        date_from?: datetime,
        date_to?: datetime
    }
}) {
    // Construct query string from parameters
    // Default sort: created_at DESC
    
    RETURN HTTP_GET("/api/stock-outgoings", {
        query: {
            page: params.page,
            limit: params.pageSize,
            sort: params.sortBy || "created_at",
            order: params.sortOrder || "desc",
            ...params.filters
        }
    });
}