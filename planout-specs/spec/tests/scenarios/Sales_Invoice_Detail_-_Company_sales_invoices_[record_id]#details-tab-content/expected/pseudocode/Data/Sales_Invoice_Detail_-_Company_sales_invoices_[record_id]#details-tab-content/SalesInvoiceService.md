/**
 * Fetches the full detail set for a specific Sales Invoice.
 * Endpoint: GET /api/sales-invoices/:id
 */
function getSalesInvoiceDetail(id: UUID): Promise<SalesInvoiceResponse> {
  return apiClient.get(`/api/sales-invoices/${id}`);
}

/**
 * Updates the workflow state of a Sales Invoice.
 * Endpoint: PATCH /api/sales-invoices/:id/workflow
 * @param action - One of: 'approve', 'send', 'cancel', 'reset'
 */
function updateInvoiceWorkflow(id: UUID, action: string): Promise<SalesInvoiceResponse> {
  return apiClient.patch(`/api/sales-invoices/${id}/workflow`, { action });
}