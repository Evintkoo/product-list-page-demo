/**
 * API Layer: Handles communication with the backend.
 * Maps frontend state to the exact API PAYLOADS requirements.
 */
export const fetchVillages = async (params) => {
  // Endpoint: GET /villages
  // Note: regency_id and province_id are passed as query params 
  // as per the API PAYLOADS definition.
  const query = new URLSearchParams({
    name: params.name,
    district_id: params.district_id,
    regency_id: params.regency_id,
    province_id: params.province_id,
    limit: params.limit,
    offset: params.offset
  }).toString();

  const response = await fetch(`/villages?${query}`, { method: 'GET' });
  return response.json();
};