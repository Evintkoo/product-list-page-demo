/**
 * Hook to fetch and map customer vehicle data for the Customer Vehicle List page.
 * Maps raw API response fields to the UI table column requirements.
 */
export const useCustomerVehicles = (customerId: string) => {
  // Fetch vehicle list from the Lumi ERP API
  const { data, isLoading, error } = useFetch(`/customers/${customerId}/vehicles`);

  const mappedVehicles = data?.map((vehicle) => ({
    // Mapping raw API fields to UI table columns
    vehicleNo: vehicle.registration_no,
    vehicleType: vehicle.vehicle_type,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    enginePower: vehicle.engine_power,
    engineBrand: vehicle.engine_brand,
    engineModel: vehicle.engine_model,
    engineYear: vehicle.engine_year,
    
    // Identifiers for row actions and navigation
    vehicleId: vehicle.vehicle_id,
    
    // Derived properties for UI components
    rowLink: `/vehicles/${vehicle.vehicle_id}`,
    editAction: `/vehicles/${vehicle.vehicle_id}/edit`
  }));

  return {
    vehicles: mappedVehicles,
    isLoading,
    error
  };
};