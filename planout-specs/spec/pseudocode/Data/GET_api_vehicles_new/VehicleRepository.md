/**
 * Fetches all active vehicle makes from the database.
 * Filters by is_active = true.
 */
FUNCTION getActiveMakes():
    RETURN SELECT id, name 
    FROM VehicleMake 
    WHERE is_active = TRUE
    ORDER BY name ASC

/**
 * Fetches all active vehicle models from the database.
 * Filters by is_active = true.
 */
FUNCTION getActiveModels():
    RETURN SELECT id, vehicle_make_id, name 
    FROM VehicleModel 
    WHERE is_active = TRUE
    ORDER BY name ASC