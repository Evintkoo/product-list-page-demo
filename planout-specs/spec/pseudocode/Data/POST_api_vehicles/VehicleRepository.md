/**
 * Data Access Layer for Vehicle entities.
 * Handles persistence logic for the POST /api/vehicles endpoint.
 */

function createVehicle(vehicleData: {
  customer_id: string,
  make: string,
  model: string,
  year: number,
  vin: string,
  created_by: string
}) {
  // Generate unique identifier for the new vehicle
  const newId = generateUUID();
  const now = getCurrentTimestamp();

  // Execute insertion into the Vehicle table
  return db.table("Vehicle").insert({
    id: newId,
    customer_id: vehicleData.customer_id,
    make: vehicleData.make,
    model: vehicleData.model,
    year: vehicleData.year,
    vin: vehicleData.vin,
    created_by: vehicleData.created_by,
    created_at: now,
    updated_at: now
  });
}

/**
 * Verifies existence of a customer before binding a vehicle.
 */
function verifyCustomerExists(customer_id: string): boolean {
  const customer = db.table("Customer").select("id").where("id", customer_id).first();
  return customer !== null;
}