export const fetchVehicles = async (params: { is_active: boolean }) => {
  const query = new URLSearchParams({ is_active: params.is_active.toString() });
  const response = await fetch(`/api/vehicles?${query.toString()}`);
  return response.json();
};