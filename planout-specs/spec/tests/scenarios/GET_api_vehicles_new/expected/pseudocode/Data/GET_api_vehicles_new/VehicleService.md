/**
 * Orchestrates the retrieval of metadata for the Add Vehicle form.
 * Combines makes and models into a structured response.
 */
FUNCTION getVehicleFormMetadata():
    TRY:
        makes = VehicleRepository.getActiveMakes()
        models = VehicleRepository.getActiveModels()
        
        RETURN {
            "makes": makes,
            "models": models
        }
    CATCH error:
        LOG "Error fetching vehicle metadata: " + error
        THROW InternalServerError("Failed to retrieve vehicle form metadata")