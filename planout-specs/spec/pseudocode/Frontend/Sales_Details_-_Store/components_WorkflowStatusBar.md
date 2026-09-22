import { useState } from 'react';
import { ConfirmationModal } from './ConfirmationModal';

export const WorkflowStatusBar = ({ status, transactionId }) => {
  const [showModal, setShowModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const handleStatusChange = (newStatus) => {
    setPendingStatus(newStatus);
    setShowModal(true);
  };

  return (
    <div className="status-bar">
      {/* Asset: assets/8ed57914-a98a-41b7-b0fb-454ab82b851a.svg (Draft) */}
      {/* Asset: assets/76f88d35-5f41-4137-b072-aa8f5e7ff266.svg (Completed) */}
      <span>Current Status: {status}</span>
      
      {showModal && (
        <ConfirmationModal 
          onConfirm={() => confirmStatusUpdate(transactionId, pendingStatus)}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};