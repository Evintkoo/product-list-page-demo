/**
 * Handles the logic for loading the Regency list screen.
 */
FUNCTION onPageLoad():
    // 1. Load filter options
    PROVINCES = CALL getProvinceList()
    
    // 2. Load initial data with default pagination
    REGENCIES = CALL getRegencyList(name=NULL, province_id=NULL, limit=20, offset=0)
    
    RETURN { PROVINCES, REGENCIES }

/**
 * Handles filter changes or pagination updates.
 */
FUNCTION onFilterChange(filters):
    // filters contains { name, province_id, limit, offset }
    RETURN CALL getRegencyList(
        filters.name, 
        filters.province_id, 
        filters.limit, 
        filters.offset
    )