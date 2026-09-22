/**
 * Maps the API response to the UI-specific data structure for the Details Tab.
 */
function mapInvoiceToViewModel(data: SalesInvoiceResponse) {
  return {
    header: {
      ref_code: data.ref_code,
      workflow_state: data.workflow_state,
      // Logic to determine header component based on workflow_state
      headerComponent: resolveHeaderComponent(data.workflow_state)
    },
    details: {
      customer_ref_code: data.customer_ref_code,
      tax_number: data.tax_number,
      sales_order_ref_code: data.sales_order_ref_code,
      customer_name: data.customer_name,
      billing_address: data.billing_address,
      invoice_date: data.invoice_date,
      due_date: data.due_date,
      expected_payment_date: data.expected_payment_date,
      credit_term_days: data.credit_term_days,
      customer_bank_details: data.customer_bank_details,
      notes: data.notes,
      closed: data.closed
    },
    amounts: {
      subtotal: data.subtotal,
      discount: data.discount,
      credit_note: data.credit_note,
      net_subtotal: data.net_subtotal,
      tax: data.tax,
      total: data.total,
      amount_due: data.amount_due,
      amount_paid: data.amount_paid
    },
    items: data.items.map(item => ({
      sku: item.sku,
      product_name: item.product_name,
      product_code: item.product_code,
      quantity: item.quantity,
      original_price: item.original_price,
      discount_rate: item.discount_rate,
      price: item.price,
      amount: item.amount
    }))
  };
}

function resolveHeaderComponent(state: string) {
  const map = {
    'draft': 'Sales Invoice Header - Draft',
    'approved': 'Sales Invoice Header - Approved',
    'sent': 'Sales Invoice Header - Sent',
    'paid': 'Sales Invoice Header - Paid',
    'cancelled': 'Sales Invoice Header - Cancelled'
  };
  return map[state] || 'Sales Invoice Header - Draft';
}