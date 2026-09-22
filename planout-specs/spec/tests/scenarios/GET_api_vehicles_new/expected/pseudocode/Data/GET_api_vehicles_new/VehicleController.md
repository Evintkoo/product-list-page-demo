/**
 * Handles the GET /api/vehicles/new request.
 */
FUNCTION handleGetNewVehicleMetadata(request):
    // Validate authentication
    IF NOT request.isAuthenticated():
        RETURN 401 Unauthorized

    // Execute service logic
    TRY:
        metadata = VehicleService.getVehicleFormMetadata()
        RETURN 200 OK, metadata
    CATCH validationError:
        RETURN 400 Bad Request, { "error": "Invalid request parameters" }
    CATCH internalError:
        RETURN 500 Internal Server Error, { "error": "An unexpected error occurred" }