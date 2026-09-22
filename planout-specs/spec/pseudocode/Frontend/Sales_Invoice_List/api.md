/**
 * Logic layer for API communication
 */
export const fetchSalesInvoices = async (params) => {
  // Maps to GET /api/sales-invoices
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`/api/sales-invoices?${query}`);
  return response.json();
};