/**
 * Component: DeactivateSupplierModal
 * Asset: assets/d5140788-10e4-4409-9b04-ac8744768858.svg
 * 
 * Logic:
 * 1. Displays a confirmation modal for deactivating a supplier.
 * 2. On "OK", triggers PATCH /api/suppliers/:id/status.
 * 3. The payload is derived by inverting the current Supplier.is_active value.
 */

import { useSupplierStatus } from './hooks/useSupplierStatus';

export const DeactivateSupplierModal = ({ supplier, onClose }) => {
  const { updateStatus, isLoading, error } = useSupplierStatus(supplier.id);

  const handleConfirm = async () => {
    // Payload construction based on API PAYLOADS:
    // Invert current is_active value
    const newStatus = !supplier.is_active;
    
    await updateStatus({
      is_active: newStatus
    });
    
    onClose();
  };

  return (
    <Modal>
      <ModalHeader>
        <Title>Confirmation</Title>
        <CloseIcon onClick={onClose} />
      </ModalHeader>

      <ModalBody>
        <ConfirmationText>Are you sure?</ConfirmationText>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </ModalBody>

      <ModalFooter>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
        <OkButton 
          onClick={handleConfirm} 
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "OK"}
        </OkButton>
      </ModalFooter>
    </Modal>
  );
};