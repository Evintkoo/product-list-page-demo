/**
 * Fetches the full details of a specific Sales Invoice.
 * @param {string} id - The UUID of the Sales Invoice.
 */
async function getSalesInvoiceDetails(id) {
  const response = await fetch(`/api/sales-invoices/${id}`, { method: 'GET' });
  if (!response.ok) throw new Error('Failed to fetch invoice details');
  return await response.json();
}

/**
 * Updates the workflow state of a Sales Invoice.
 * @param {string} id - The UUID of the Sales Invoice.
 * @param {string} action - The workflow action (e.g., 'approve', 'send', 'cancel', 'reset').
 */
async function updateInvoiceWorkflow(id, action) {
  const response = await fetch(`/api/sales-invoices/${id}/workflow`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action })
  });
  if (!response.ok) throw new Error('Workflow action failed');
  return await response.json();
}