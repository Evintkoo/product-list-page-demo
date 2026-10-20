export const fetchWarehouseStocks = async (id: string) => {
  // GET /products/:id/warehouse-stocks
  const response = await fetch(`/products/${id}/warehouse-stocks`);
  return response.json();
};