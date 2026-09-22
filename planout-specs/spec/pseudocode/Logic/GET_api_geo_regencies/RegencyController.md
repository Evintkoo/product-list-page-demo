/**
 * Handles the retrieval of regency/municipality options for cascading dropdowns.
 */
function getRegencies(request) {
    // 1. Extract and validate query parameters
    const provinceId = request.query.province_id;

    if (!provinceId) {
        return response.error(400, "Missing required parameter: province_id");
    }

    // 2. Fetch data from storage
    // Filter by province_id and only include active records
    const regencies = database.Regency.findMany({
        where: {
            province_id: provinceId,
            is_active: true
        },
        orderBy: {
            name: "asc"
        },
        select: ["id", "name"]
    });

    // 3. Return formatted response
    return response.success(200, {
        data: regencies
    });
}