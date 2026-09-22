/**
 * Handles customer selection and subsequent invoice loading.
 */
function onCustomerSelected(customerId: string) {
  // Reset form state
  clearSelectedInvoice();
  clearProducts();
  resetTotals();

  // Fetch eligible invoices for the selected customer
  fetchInvoicesByCustomer(customerId);
}

async function fetchInvoicesByCustomer(customerId: string) {
  setLoading(true);
  try {
    const invoices = await api.get("/api/sales-invoices", { params: { customer_id: customerId } });
    populateInvoiceDropdown(invoices);
  } finally {
    setLoading(false);
  }
}

/**
 * Handles submission of the New Sales Order Return form.
 */
async function handleSave() {
  // 1. Validation
  if (!validateForm()) {
    return;
  }

  // 2. Build Request Payload
  const payload = {
    warehouse_id: form.warehouse_id,
    customer_id: form.customer_id,
    sales_invoice_id: form.sales_invoice_id,
    notes: form.notes,
    items: form.items
      .filter(item => item.returned_quantity > 0)
      .map(item => ({
        sales_invoice_item_id: item.sales_invoice_item_id,
        returned_quantity: item.returned_quantity,
        reason: item.reason
      }))
  };

  // 3. Submit
  setSubmitting(true);
  try {
    const response = await api.post("/api/sales-order-returns", payload);
    
    // 4. Redirect on success
    const newReturnId = response.id;
    navigateTo(`/sales_order_returns/${newReturnId}`);
  } catch (error) {
    displayError(error);
  } finally {
    setSubmitting(false);
  }
}

/**
 * Validation logic for the form
 */
function validateForm() {
  if (!form.warehouse_id || !form.customer_id || !form.sales_invoice_id) return false;
  
  const hasValidItems = form.items.some(i => i.returned_quantity > 0);
  if (!hasValidItems) return false;

  // Ensure no item exceeds the server-provided remaining quantity
  const isOverLimit = form.items.some(i => i.returned_quantity > i.remaining_quantity);
  if (isOverLimit) return false;

  return true;
}