/**
 * API Layer
 * Maps frontend requests to the authoritative API endpoints.
 */

export const fetchPaymentTypes = async (params) => {
  // GET /api/payment-types
  // Maps:
  // name -> name
  // type -> type
  // enable_refund -> enable_refund
  // skip_invoice_receivables -> skip_invoice_receivables
  // is_active -> is_active
  // page -> page
  // page_size -> page_size
  
  const response = await apiClient.get('/api/payment-types', { params });
  return response.data;
};

// ORPHAN_FIELD: is_active (Used in API payload but not in DATA SCHEMAS)
// ORPHAN_FIELD: page (Used in API payload but not in DATA SCHEMAS)
// ORPHAN_FIELD: page_size (Used in API payload but not in DATA SCHEMAS)