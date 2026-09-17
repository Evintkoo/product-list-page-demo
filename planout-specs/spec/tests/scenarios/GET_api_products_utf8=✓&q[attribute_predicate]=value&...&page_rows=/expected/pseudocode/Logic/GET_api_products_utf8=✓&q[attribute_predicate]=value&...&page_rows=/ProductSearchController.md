/**
 * Handles the GET /api/products request.
 * Orchestrates the filtering, pagination, and retrieval of products.
 */
function getProducts(request) {
    // 1. Validate authentication and authorization
    if (!isAuthenticated(request)) return sendError(401);
    if (!hasPermission(request, 'list_products')) return sendError(403);

    // 2. Extract and sanitize query parameters
    const filters = extractFilters(request.query);
    const pageRows = parseInt(request.query.page_rows) || 20;

    // 3. Validate filter references (e.g., check if IDs exist)
    if (!validateFilterReferences(filters)) {
        return sendError(404, "Referenced filter entity not found");
    }

    // 4. Execute search query
    try {
        const results = ProductService.search(filters, pageRows);
        return sendResponse(200, results);
    } catch (error) {
        if (error.isValidationError) return sendError(422, error.message);
        return sendError(500, "Internal Server Error");
    }
}