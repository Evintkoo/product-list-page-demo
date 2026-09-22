// Asset: assets/3a8b795a-e487-4eed-a277-33394b043baa.svg

Component DeliverConfirmationModal {
  Function handleConfirm() {
    // PATCH /sales-deliveries/:id/{status} where status = "delivered"
    PATCH /sales-deliveries/:id/delivered;
    showToast("Success: Delivery confirmed");
    updateWorkflowStatus("DELIVERED");
    closeModal();
  }

  Render {
    <Modal title="Deliver">
      <Text>Are you sure?</Text>
      <Button onClick={closeModal}>Cancel</Button>
      <Button onClick={handleConfirm}>OK</Button>
    </Modal>
  }
}