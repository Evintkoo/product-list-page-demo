/**
 * The Data layer provides the state representation of the customer 
 * selected for the deactivation workflow.
 */

interface SelectedCustomer {
  // The unique identifier used for API routing: PATCH /api/customers/:id/status
  customer_id: Customer.id;
  
  // Display name for the confirmation modal UI
  name: Customer.name;
  
  // Current status to ensure the deactivation request is valid
  is_active: Customer.is_active;
}

/**
 * Retrieves the current selection state from the global application store.
 * This data is passed to the DeactivateCustomerModal component.
 */
function getSelectedCustomer(): SelectedCustomer {
  return store.getState().customers.selectedCustomer;
}

/**
 * API Contract Definition:
 * Endpoint: PATCH /api/customers/:id/status
 * Path Parameter: :id (maps to customer_id)
 * Request Body: { "is_active": false }
 */