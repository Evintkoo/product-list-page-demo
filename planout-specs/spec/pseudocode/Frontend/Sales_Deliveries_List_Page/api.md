export const fetchSalesDeliveries = (params) => {
  // Maps to GET /sales-deliveries
  // Query params: sales_delivery, reference_no, sales_order, sales_invoice, 
  // customer, warehouse, from_date, to_date, status, page, sort_by
  return apiClient.get('/sales-deliveries', { params });
};

export const fetchWarehouses = () => {
  // Maps to GET /warehouses
  return apiClient.get('/warehouses');
};