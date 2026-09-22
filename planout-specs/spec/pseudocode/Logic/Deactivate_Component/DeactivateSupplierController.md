/**
 * Controller logic triggered by the "OK" button in the Deactivate Supplier Modal.
 */
async function handleDeactivateConfirm(selectedSupplier, { close, refreshList }) {
  const { toggleSupplierStatus } = useSupplierStatus();

  // Execute the status toggle
  const success = await toggleSupplierStatus(selectedSupplier);

  if (success) {
    // Close the modal and refresh the parent list view
    close();
    refreshList();
  } else {
    // Modal remains open, error state is handled by the hook's error property
    console.error("Status update failed, keeping modal open.");
  }
}