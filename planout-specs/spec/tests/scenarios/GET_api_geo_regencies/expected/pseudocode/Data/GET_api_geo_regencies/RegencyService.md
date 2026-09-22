/**
 * Orchestrates the retrieval of regency options.
 * Validates input and handles data transformation.
 */
FUNCTION fetchRegencyOptions(province_id: String):
    // 1. Validate input
    IF province_id IS NULL OR province_id IS EMPTY:
        THROW ValidationError("province_id is required")

    // 2. Fetch from repository
    TRY:
        regencies = RegencyRepository.getActiveRegenciesByProvince(province_id)
        
        // 3. Map to response format
        RETURN regencies.map(r => ({
            id: r.id,
            name: r.name
        }))
    CATCH error:
        LOG error
        THROW InternalServerError("Failed to retrieve regencies")