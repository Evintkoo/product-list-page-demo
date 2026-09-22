/**
 * Component: ActionButtons
 * Contains document management controls: Print, Send, and Cancel.
 */

export const ActionButtons = () => {
  
  const handlePrint = () => {
    window.print();
  };

  const handleSend = async () => {
    // Calls PATCH /? to advance workflow
    const response = await fetch('/?', { method: 'PATCH' });
    // Handle Purchase Return Send Response
  };

  const handleCancel = async () => {
    const confirmed = window.confirm("Are you sure you want to discard changes?");
    if (confirmed) {
      // Calls PATCH /? to revert state
      const response = await fetch('/?', { method: 'PATCH' });
      // Handle Purchase Return Cancel Response
    }
  };

  return (
    <div className="action-buttons-group">
      <button onClick={handlePrint} aria-label="Print">
        <PrinterIcon />
      </button>
      <button onClick={handleSend} aria-label="Sending">
        <MailIcon />
      </button>
      <button onClick={handleCancel} aria-label="Cancel">
        <CrossIcon />
      </button>
    </div>
  );
};