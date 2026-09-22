/**
 * Fetches the list of provinces for the filter dropdown.
 */
FUNCTION getProvinceList():
    RETURN HTTP GET "/provinces"

/**
 * Fetches the list of regencies/municipalities based on search filters and pagination.
 * 
 * @param name - Filter by Regency.name
 * @param province_id - Filter by Regency.province_id
 * @param limit - Pagination limit <!-- MISSING_FIELD: Pagination.limit -->
 * @param offset - Pagination offset <!-- MISSING_FIELD: Pagination.offset -->
 */
FUNCTION getRegencyList(name, province_id, limit, offset):
    QUERY_PARAMS = {
        "name": name,
        "province_id": province_id,
        "limit": limit,
        "offset": offset
    }
    
    RESPONSE = HTTP GET "/regencies" WITH QUERY_PARAMS
    
    // Map the response to the UI structure
    RETURN RESPONSE.map(item => {
        RETURN {
            "code": item.code,
            "name": item.name,
            "province_name": FETCH_PROVINCE_NAME_BY_ID(item.province_id) <!-- MISSING_FIELD: Province.name_lookup -->
        }
    })