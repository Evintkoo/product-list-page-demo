/**
 * Handles the GET /api/areas request for villages.
 * Validates query parameters and delegates to the AreaService.
 */
function getAreas(request) {
    // 1. Validate mandatory area_type
    if (request.query.area_type !== 'village') {
        return respond(400, { error: "Invalid area_type. Only 'village' is supported." });
    }

    // 2. Extract filters
    const filters = {
        name: request.query.name,
        province_id: request.query.province_id,
        regency_id: request.query.regency_id,
        district_id: request.query.district_id,
        page: parseInt(request.query.page) || 1,
        page_size: parseInt(request.query.page_size) || 20
    };

    // 3. Fetch data
    try {
        const data = AreaService.findVillages(filters);
        return respond(200, data);
    } catch (error) {
        return respond(500, { error: "Internal Server Error" });
    }
}