// Asset: assets/da232fae-c1b1-4114-949d-fb4e3707cebb.svg

Component CancelConfirmationModal {
  Function handleConfirm() {
    // PATCH /sales-deliveries/:id/{status} where status = "voided"
    PATCH /sales-deliveries/:id/voided;
    showToast("Success: Delivery cancelled");
    navigateTo("/sales-deliveries");
  }

  Render {
    <Modal title="Cancel">
      <Text>Are you sure?</Text>
      <Button onClick={closeModal}>Cancel</Button>
      <Button onClick={handleConfirm}>OK</Button>
    </Modal>
  }
}