/**
 * Data access layer for Sales Order Details and related tabs.
 * Each method maps to the specific API endpoints required for the tabbed interface.
 */

// Fetch primary Sales Order details including items and totals
function getSalesOrderDetails(salesOrderId) {
  return api.get(`/sales-orders/${salesOrderId}`);
}

// Fetch related Quotations for the Sales Order
function getSalesQuotations(salesOrderId, params = { limit: 10, offset: 0 }) {
  return api.get(`/sales-orders/${salesOrderId}/quotations`, { params });
}

// Fetch related Deliveries for the Sales Order
function getSalesDeliveries(salesOrderId) {
  return api.get(`/sales-orders/${salesOrderId}/deliveries`);
}

// Fetch related Invoices for the Sales Order
function getSalesInvoices(salesOrderId, params = { limit: 10, offset: 0 }) {
  return api.get(`/sales-orders/${salesOrderId}/invoices`, { params });
}

// Fetch related Returns for the Sales Order
function getSalesReturns(salesOrderId) {
  return api.get(`/sales-orders/${salesOrderId}/returns`);
}