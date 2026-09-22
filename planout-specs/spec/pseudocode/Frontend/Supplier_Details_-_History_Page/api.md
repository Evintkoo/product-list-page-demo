export const checkAuth = async () => {
  // GET /api/auth/me
  const response = await fetch('/api/auth/me');
  if (!response.ok) throw { status: response.status };
  return response.json();
};

export const fetchSupplierHistory = async (id: string) => {
  // GET /api/suppliers/:id/history
  const response = await fetch(`/api/suppliers/${id}/history`);
  if (!response.ok) throw { status: response.status };
  return response.json();
};