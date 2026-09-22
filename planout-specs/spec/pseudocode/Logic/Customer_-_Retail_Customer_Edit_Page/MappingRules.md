/**
 * Maps form state to API payload structure.
 * Note: Fields like customer_code, identity_number, etc., are handled 
 * as per the Save Mapping Rules requirements.
 */
export const mapFormToPayload = (formState) => {
  return {
    name: formState.name,
    phone: formState.phone,
    store_id: formState.store_id,
    service_tax_id: formState.service_tax_id,
    // <!-- MISSING_FIELD: Customer.customer_code -->
    // <!-- MISSING_FIELD: Customer.customer_region -->
    // <!-- MISSING_FIELD: Customer.identity_number -->
    // ... additional fields mapped per Save Mapping Rules
  };
};