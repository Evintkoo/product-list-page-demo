/**
 * Logic layer for API communication
 */
export const checkAuth = async () => {
  // API CONTRACT: GET /auth/me
  const response = await fetch('/auth/me');
  return response.ok;
};

export const fetchProvinces = async ({ area_type, page, search }) => {
  // API CONTRACT: GET /areas
  const query = new URLSearchParams({ area_type, page, search }).toString();
  const response = await fetch(`/areas?${query}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};