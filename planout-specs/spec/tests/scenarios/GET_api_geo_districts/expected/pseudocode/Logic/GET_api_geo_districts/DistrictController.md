/**
 * Handles the retrieval of district options for cascading dropdowns.
 */
function getDistricts(request) {
    // 1. Validate Authentication
    if (!request.session.isValid()) {
        return respond(401, { error: "Unauthorized" });
    }

    // 2. Extract and Validate Query Parameters
    const regencyId = request.query.regency_id;
    if (!regencyId || !isValidUuid(regencyId)) {
        return respond(400, { error: "Invalid or missing regency_id" });
    }

    // 3. Fetch Data from Service
    try {
        const districts = DistrictService.getActiveDistrictsByRegency(regencyId);
        
        // 4. Return formatted response
        return respond(200, {
            status: 200,
            data: districts.map(d => ({
                id: d.id,
                name: d.name
            }))
        });
    } catch (error) {
        return respond(500, { error: "Internal Server Error" });
    }
}