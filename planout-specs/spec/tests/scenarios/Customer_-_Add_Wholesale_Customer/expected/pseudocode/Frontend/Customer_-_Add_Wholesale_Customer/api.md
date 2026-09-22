export const fetchAuthMe = async () => {
  const response = await fetch('/api/auth/me');
  if (!response.ok) throw new Error('Unauthorized');
  return response.json();
};

export const fetchCustomerDefaults = async () => {
  const response = await fetch('/api/customers/new?wholesale=1');
  return response.json();
};

export const createCustomer = async (payload) => {
  const response = await fetch('/api/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  if (response.status === 422) {
    const data = await response.json();
    throw data.errors;
  }
  return response.json();
};

/* 
ORPHAN_FIELD: phone
ORPHAN_FIELD: area_region
ORPHAN_FIELD: ktp
ORPHAN_FIELD: detail_bank
ORPHAN_FIELD: notes
ORPHAN_FIELD: npwp
ORPHAN_FIELD: nppkp
ORPHAN_FIELD: nitku
ORPHAN_FIELD: customer_group
ORPHAN_FIELD: salesperson
ORPHAN_FIELD: credit_term
ORPHAN_FIELD: credit_limit
ORPHAN_FIELD: overdue_limit
ORPHAN_FIELD: currency
ORPHAN_FIELD: pricelist
ORPHAN_FIELD: sales_tax
ORPHAN_FIELD: ar_invoice_account
ORPHAN_FIELD: credit_note_account
ORPHAN_FIELD: customer_down_payment_account
ORPHAN_FIELD: deposit_account
*/