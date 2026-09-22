/**
 * Controller handling the retrieval of Area entities.
 * Scoped specifically to regencies via query parameters.
 */
function getAreas(request) {
    // 1. Validate authentication
    if (!request.session.isValid()) {
        return response.error(401, "Unauthorized");
    }

    // 2. Extract and sanitize query parameters
    const filters = {
        area_type: request.query.area_type, // Expected: "regency"
        name: request.query.name,
        parent_id: request.query.province_id
    };

    const pagination = {
        page: request.query.page || 1,
        pageSize: request.query.page_size || 20
    };

    // 3. Validate mandatory area_type
    if (filters.area_type !== "regency") {
        return response.error(400, "Invalid area_type. Only 'regency' is supported.");
    }

    // 4. Delegate to Service layer
    try {
        const data = AreaService.findRegencies(filters, pagination);
        return response.success(200, data);
    } catch (error) {
        return response.error(500, "Internal Server Error");
    }
}