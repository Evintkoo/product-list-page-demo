/**
 * API Contract: GET /suppliers
 * Maps to the logic defined in the Page Load and Search Button nodes.
 */
export const fetchSuppliers = async (params: { is_internal: boolean, page?: number, search?: string }) => {
  const query = new URLSearchParams({
    is_internal: params.is_internal.toString(),
    page: (params.page || 1).toString(),
    search: params.search || ''
  });
  
  const response = await fetch(`/api/suppliers?${query.toString()}`);
  return response.json();
};