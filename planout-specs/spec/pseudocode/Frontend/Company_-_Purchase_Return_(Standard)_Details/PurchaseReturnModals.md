// Asset: assets/20485c04-1daa-414c-86cc-6d47f9391c37.svg (Approve Start)
// Asset: assets/06d7e735-c8f6-48b8-a528-8e68e1319217.svg (Approve)

function ApproveStartModal({ id, onConfirm }) {
  return (
    <Modal title="Approve Start">
      <p>Proceed to confirm supplier quantities?</p>
      <Button onClick={onConfirm}>OK</Button>
    </Modal>
  );
}

function ApproveModal({ id, onConfirm }) {
  // Validation: Supplier Confirmed Qty must be >= 0 and <= Return Qty
  // This validation is enforced on the input fields within the form
  return (
    <Modal title="Approve">
      <p>Confirm approval of this return?</p>
      <Button onClick={() => fetch(`POST /inventory/purchase-returns/standard/${id}/approve`)}>
        OK
      </Button>
    </Modal>
  );
}