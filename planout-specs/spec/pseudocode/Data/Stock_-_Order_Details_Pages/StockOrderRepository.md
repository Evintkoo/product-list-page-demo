// Logic for fetching and updating Stock Order data entities

FUNCTION getStockOrderById(id):
    // Fetches header details for the specific stock order
    RETURN HTTP GET /api/stock-orders/:id

FUNCTION getStockOrderItems(id, page, limit):
    // Fetches paginated line items for the stock order table
    RETURN HTTP GET /api/stock-orders/:id/items?page={page}&limit={limit}

FUNCTION confirmStockOrder(id):
    // Advances workflow stage to confirmed
    RETURN HTTP PATCH /api/stock-orders/:id/confirm

FUNCTION cancelStockOrder(id):
    // Reverts document to cancelled state
    RETURN HTTP PATCH /api/stock-orders/:id/cancel