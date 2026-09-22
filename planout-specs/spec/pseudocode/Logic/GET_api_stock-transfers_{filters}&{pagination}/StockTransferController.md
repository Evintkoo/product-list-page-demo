/**
 * GET /api/stock-transfers
 * Retrieves a paginated list of stock transfers for the authenticated company.
 */
function getStockTransfers(request) {
    // 1. Authentication & Authorization
    // Ensure user is authenticated and extract company_id from session/token
    const companyId = request.user.company_id; 
    
    // 2. Extract Query Parameters
    const filters = {
        source_warehouse_id: request.query.source_warehouse_id,
        destination_warehouse_id: request.query.destination_warehouse_id,
        status: request.query.status
    };
    
    const pagination = {
        limit: parseInt(request.query.limit) || 20,
        offset: parseInt(request.query.offset) || 0
    };

    // 3. Execute Query
    // Fetch records scoped to company_id, applying filters if present
    const { rows, totalCount } = StockTransferService.findMany({
        company_id: companyId,
        ...filters
    }, pagination);

    // 4. Return Response
    return {
        status: 200,
        body: {
            data: rows,
            pagination: {
                limit: pagination.limit,
                offset: pagination.offset,
                total: totalCount
            }
        }
    };
}