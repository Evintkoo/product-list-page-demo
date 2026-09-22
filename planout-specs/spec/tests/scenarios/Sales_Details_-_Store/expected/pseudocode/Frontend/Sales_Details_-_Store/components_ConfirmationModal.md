export const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <p>Are you sure you want to change the status?</p>
      {/* PATCH /sales/:id/status */}
      <button onClick={onConfirm}>OK</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};