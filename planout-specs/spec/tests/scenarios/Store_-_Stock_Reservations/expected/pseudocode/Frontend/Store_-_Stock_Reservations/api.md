export const fetchAuthMe = async () => {
  const response = await fetch('/api/auth/me');
  if (!response.ok) throw new Error('Unauthorized');
  return response.json();
};

export const fetchStores = async () => {
  const response = await fetch('/api/stores');
  return response.json();
};

export const fetchStockReservations = async (params) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`/api/stock-reservations?${query}`);
  return response.json();
};