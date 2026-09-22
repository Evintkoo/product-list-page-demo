/**
 * Controller handling the GET /api/vehicles/new request.
 */

ROUTE GET /api/vehicles/new:
    TRY:
        // Ensure user is authenticated (Middleware check)
        IF NOT AUTH.isAuthenticated():
            RETURN 401 { error: "Unauthorized" }

        // Fetch data from service
        SET data = CALL getNewVehicleReferenceData()

        // Return 200 OK with the payload
        RETURN 200 data

    CATCH Exception:
        // Log error for internal monitoring
        LOG.error("Failed to fetch vehicle reference data", Exception)
        
        // Return 500 for unexpected failures
        RETURN 500 { error: "Internal Server Error" }