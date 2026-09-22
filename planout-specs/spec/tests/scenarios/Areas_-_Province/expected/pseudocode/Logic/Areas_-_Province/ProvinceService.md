/**
 * Logic to handle Province data retrieval and session validation
 */

FUNCTION getProvinceList(page: Integer, searchQuery: String):
    // 1. Validate Session
    TRY:
        session = CALL GET /auth/me
    CATCH 401:
        REDIRECT TO "/login"
        RETURN

    // 2. Fetch Provinces with filters
    // Maps to GET /areas?area_type=province&page={page}&search={searchQuery}
    response = CALL GET /areas WITH:
        area_type = "province"
        page = page
        search = searchQuery
        sort = "name"
        order = "asc"

    // 3. Return mapped data for the UI
    RETURN response.data.map(province => ({
        id: province.id,
        code: province.code,
        name: province.name,
        createdAt: province.created_at
    }))