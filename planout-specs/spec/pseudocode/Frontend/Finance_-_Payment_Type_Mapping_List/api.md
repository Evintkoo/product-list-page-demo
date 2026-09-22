/**
 * API Service Layer
 * Maps frontend state to authoritative API payloads
 */

export const fetchPaymentTypeMappings = async (params: {
  store_id?: string,
  payment_type_id?: string,
  is_active?: boolean
}) => {
  // GET /payment-type-mappings
  // Maps request body fields: store_id, payment_type_id, is_active
  const response = await fetch('/payment-type-mappings', {
    method: 'GET',
    body: JSON.stringify(params)
  });
  return response.json();
};

export const fetchStores = async () => {
  // GET /stores
  const response = await fetch('/stores');
  return response.json();
};

export const fetchPaymentTypes = async () => {
  // GET /payment-types
  const response = await fetch('/payment-types');
  return response.json();
};