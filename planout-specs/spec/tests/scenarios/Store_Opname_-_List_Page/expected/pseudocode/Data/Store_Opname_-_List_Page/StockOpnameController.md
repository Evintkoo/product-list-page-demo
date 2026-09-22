/**
 * Handles the retrieval of Stock Opname records.
 * Endpoint: GET /api/stock-opname
 */
function getStockOpnameList(query: string) {
    // 1. Validate and sanitize the search query parameter
    // The query can filter by reference_number or status
    const filter = sanitize(query);

    // 2. Query the database for StockOpname records
    // Join with Warehouse to provide context in the list view
    const results = db.StockOpname.findMany({
        where: {
            OR: [
                { reference_number: { contains: filter, mode: 'insensitive' } },
                { status: { equals: filter, mode: 'insensitive' } }
            ]
        },
        include: {
            warehouse: {
                select: { name: true }
            }
        },
        orderBy: {
            created_at: 'desc'
        }
    });

    // 3. Return the formatted list to the frontend
    return {
        data: results,
        meta: {
            totalCount: results.length
        }
    };
}