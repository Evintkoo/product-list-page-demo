/**
 * Component: DeactivateCustomerModal
 * Purpose: Confirms the deactivation of a specific customer.
 * Asset: assets/a584d18f-a3c0-4a0c-bdeb-0d01fcebfc88.svg
 */

import { useMutation } from 'lumi-api-client'; // Hypothetical hook for API calls

export const DeactivateCustomerModal = ({ customer, onClose }) => {
  
  // Mutation to update customer status
  // API: PATCH /api/customers/:id/status
  const { mutate: deactivateCustomer, isLoading } = useMutation({
    method: 'PATCH',
    path: '/api/customers/:id/status',
    onSuccess: () => {
      onClose();
      // Trigger global state refresh for Customer list
    }
  });

  const handleConfirm = () => {
    // Payload must match API PAYLOADS: {"is_active": boolean}
    deactivateCustomer({
      params: { id: customer.id },
      body: { is_active: false }
    });
  };

  return (
    <Modal>
      {/* Header */}
      <ModalHeader>
        <Title>Confirmation</Title>
        <CloseIcon onClick={onClose} /> <!-- Dismisses modal -->
      </ModalHeader>

      {/* Body */}
      <ModalBody>
        <ConfirmationText>
          Are you sure you want to deactivate {customer.name}? <!-- ORPHAN_FIELD: customer.name -->
        </ConfirmationText>
      </ModalBody>

      {/* Footer */}
      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleConfirm}
          disabled={isLoading}
        >
          OK
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// ===== LOGIC & VALIDATION RULES =====
/**
 * 1. Data Integrity:
 *    - The 'is_active' field in the request body MUST be set to 'false' 
 *      to satisfy the "Deactivate" business intent.
 * 
 * 2. Validation:
 *    - The "OK" button is disabled while the API request is in flight (isLoading).
 *    - The modal must be dismissed via the Close (X) icon or "Cancel" button 
 *      without triggering any state changes.
 * 
 * 3. API Consistency:
 *    - Path parameter ':id' must be derived from the selected Customer.id.
 *    - Payload body must strictly contain 'is_active' as defined in 
 *      API PAYLOADS for PATCH /api/customers/:id/status.
 */