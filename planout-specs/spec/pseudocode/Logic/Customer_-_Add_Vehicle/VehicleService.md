/**
 * Fetches initial data required to populate the Add Vehicle form.
 */
function getVehicleFormMetadata() {
    // GET /api/vehicles/new
    // Returns lists of available vehicle makes and models for dropdown population
    return api.get("/api/vehicles/new");
}

/**
 * Handles the submission of the new vehicle record.
 * Maps form state to the Vehicle entity schema.
 */
function createVehicle(formData) {
    const payload = {
        customer_id: formData.customer_id,
        registration_no: formData.registration_no,
        hull_number: formData.hull_number,
        vehicle_type: formData.vehicle_type,
        vehicle_make_id: formData.vehicle_make_id,
        vehicle_model_id: formData.vehicle_model_id,
        year: formData.year,
        vin: formData.vin,
        registration_date: formData.registration_date,
        engine_number: formData.engine_number,
        odometer: formData.odometer,
        color: formData.color,
        model_code: formData.model_code,
        is_active: formData.is_active,
        engine_capacity_cc: formData.engine_capacity_cc,
        transmission_type: formData.transmission_type,
        last_service: formData.last_service,
        next_service: formData.next_service,
        notes: formData.notes
    };

    // POST /api/vehicles
    return api.post("/api/vehicles", payload);
}