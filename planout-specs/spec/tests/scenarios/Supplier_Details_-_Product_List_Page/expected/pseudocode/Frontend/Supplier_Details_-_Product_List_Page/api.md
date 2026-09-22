/**
 * API Contract Implementation
 */
export const fetchSupplierProducts = async (supplier_id) => {
  // GET /suppliers/{supplier_id}/products
  const response = await fetch(`/suppliers/${supplier_id}/products`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};