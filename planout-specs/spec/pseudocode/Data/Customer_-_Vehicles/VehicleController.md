/**
 * API Controller for /api/vehicles
 */

ENDPOINT GET /api/vehicles
  INPUT: query_param "status" (optional)
  
  // Fetch data from repository
  data = CALL VehicleRepository.getVehicles(status)
  
  RETURN JSON {
    "vehicles": data
  }