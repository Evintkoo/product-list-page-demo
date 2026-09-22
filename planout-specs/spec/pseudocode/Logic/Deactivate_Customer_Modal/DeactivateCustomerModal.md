/**
 * Component logic for the Deactivate Customer Modal.
 * Uses the hook to execute the PATCH request and manage modal lifecycle.
 */
const DeactivateCustomerModal = ({ customer, onClose, onRefreshList }) => {
  const { deactivateCustomer, isSubmitting, error } = useDeactivateCustomer(customer.id);

  const handleConfirm = async () => {
    await deactivateCustomer(() => {
      onRefreshList();
      onClose();
    });
  };

  return (
    <Modal>
      <p>Are you sure you want to deactivate {customer.name}?</p>
      
      {error && <ErrorMessage message={error} />}
      
      <Button 
        onClick={handleConfirm} 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'OK'}
      </Button>
      
      <Button onClick={onClose} disabled={isSubmitting}>
        Cancel
      </Button>
    </Modal>
  );
};