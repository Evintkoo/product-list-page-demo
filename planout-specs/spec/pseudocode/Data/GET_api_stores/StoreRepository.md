/**
 * Data access layer for Store entities.
 * Handles database interaction for the GET /api/stores endpoint.
 */

FUNCTION fetchAllStores():
    TRY:
        // Query the Store table for all active records
        records = DATABASE.query("SELECT id, name, location_code, is_active, created_at FROM Store WHERE is_active = true")
        RETURN records
    CATCH DatabaseError:
        // Log the specific database error for internal monitoring
        LOG_ERROR("Database failure while fetching stores: " + DatabaseError.message)
        // Throw a generic error to be caught by the controller to return 500
        THROW InternalServerError("An unexpected server error occurred while querying store records.")