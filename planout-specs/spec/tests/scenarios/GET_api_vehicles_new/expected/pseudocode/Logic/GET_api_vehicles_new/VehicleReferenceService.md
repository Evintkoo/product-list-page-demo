/**
 * Logic to fetch reference data for the "Add New Vehicle" form.
 * Filters for active records only to ensure data integrity in dropdowns.
 */

FUNCTION getNewVehicleReferenceData():
    // 1. Fetch all active vehicle makes
    // Query: SELECT id, name FROM VehicleMake WHERE is_active = true
    SET activeMakes = DATABASE.VehicleMake.findMany({
        where: { is_active: true },
        select: { id: true, name: true }
    })

    // 2. Fetch all active vehicle models
    // Query: SELECT id, vehicle_make_id, name FROM VehicleModel WHERE is_active = true
    SET activeModels = DATABASE.VehicleModel.findMany({
        where: { is_active: true },
        select: { id: true, vehicle_make_id: true, name: true }
    })

    // 3. Construct and return the response object
    RETURN {
        makes: activeMakes,
        models: activeModels
    }