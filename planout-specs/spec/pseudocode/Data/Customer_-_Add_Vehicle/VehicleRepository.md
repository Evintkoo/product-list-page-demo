/**
 * Handles persistence logic for the Vehicle entity.
 * Maps the incoming Vehicle Create Request JSON to the database schema.
 */

FUNCTION createVehicle(vehicleData):
    // Validate that the customer exists
    IF NOT Customer.exists(vehicleData.customer_id):
        THROW Error("Invalid Customer ID")

    // Construct the record based on the schema mapping
    NEW_VEHICLE = {
        id: generateUUID(),
        customer_id: vehicleData.customer_id,
        registration_no: vehicleData.registration_no,
        hull_number: vehicleData.hull_number,
        vehicle_type: vehicleData.vehicle_type,
        vehicle_make_id: vehicleData.vehicle_make_id,
        vehicle_model_id: vehicleData.vehicle_model_id,
        year: vehicleData.year,
        vin: vehicleData.vin,
        registration_date: vehicleData.registration_date,
        engine_number: vehicleData.engine_number,
        odometer: vehicleData.odometer,
        color: vehicleData.color,
        model_code: vehicleData.model_code,
        is_active: vehicleData.is_active,
        engine_capacity_cc: vehicleData.engine_capacity_cc,
        transmission_type: vehicleData.transmission_type,
        last_service: vehicleData.last_service,
        next_service: vehicleData.next_service,
        notes: vehicleData.notes,
        created_at: getCurrentTimestamp()
    }

    // Persist to database
    INSERT INTO Vehicle VALUES NEW_VEHICLE
    RETURN NEW_VEHICLE.id

END FUNCTION