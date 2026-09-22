/**
 * POST /api/vehicles
 * Creates a new vehicle record for a specific customer.
 */
async function createVehicle(req, res) {
    // 1. Authentication Check
    const user = await Auth.getCurrentUser(req);
    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    // 2. Validate Request Body
    const { customer_id, make, model, year, vin } = req.body;
    if (!customer_id || !make || !model || !year || !vin) {
        return res.status(400).json({ error: "Invalid request parameters" });
    }

    try {
        // 3. Verify Customer Existence
        const customerExists = await Database.Customer.findOne({ id: customer_id });
        if (!customerExists) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // 4. Prepare Vehicle Record
        const newVehicle = {
            id: UUID.generate(),
            customer_id: customer_id,
            make: make,
            model: model,
            year: year,
            vin: vin,
            created_by: user.id,
            created_at: DateTime.now(),
            updated_at: DateTime.now()
        };

        // 5. Persist to Database
        const createdVehicle = await Database.Vehicle.insert(newVehicle);

        // 6. Return Success
        return res.status(201).json(createdVehicle);

    } catch (error) {
        // 7. Handle Server Errors
        return res.status(500).json({ error: "Internal server error" });
    }
}