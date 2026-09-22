/**
 * Logic to ensure the Vehicle List table columns receive the correct data types.
 * This acts as the transformation layer between the API response and the 
 * presentation component.
 */
export const formatVehicleRow = (vehicle) => {
  return {
    "Vehicle No": vehicle.registration_no,
    "Vehicle Type": vehicle.vehicle_type,
    "Make": vehicle.make,
    "Model": vehicle.model,
    "Year": vehicle.year,
    "Engine Power": vehicle.engine_power,
    "Engine Brand": vehicle.engine_brand,
    "Engine Model": vehicle.engine_model,
    "Engine Year": vehicle.engine_year,
    "Actions": {
      "viewId": vehicle.vehicle_id,
      "editId": vehicle.vehicle_id
    }
  };
};