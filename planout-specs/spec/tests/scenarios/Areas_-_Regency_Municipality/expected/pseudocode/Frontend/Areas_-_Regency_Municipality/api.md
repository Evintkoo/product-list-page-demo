/**
 * API Service Layer
 * Maps frontend state to API PAYLOADS
 */

export const fetchProvinces = async () => {
  const response = await fetch('/provinces', { method: 'GET' });
  return response.json();
};

export const fetchRegencies = async ({ name, province_id, limit, offset }) => {
  const query = new URLSearchParams({
    ...(name && { name }),
    ...(province_id && { province_id }),
    limit: limit.toString(),
    offset: offset.toString()
  });
  
  const response = await fetch(`/regencies?${query.toString()}`, { method: 'GET' });
  return response.json();
};