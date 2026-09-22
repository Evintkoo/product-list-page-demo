export const WorkflowStatusTracker = ({ status }) => {
  const handleStatusChange = (newStatus) => {
    // Trigger confirmation pop-up before proceeding
    if (confirm(`Change status to ${newStatus}?`)) {
      // Logic to update status via API
    }
  };

  return (
    <div className="workflow-tracker">
      {['Draft', 'Confirmed', 'Sent', 'Approved'].map((s) => (
        <div 
          key={s} 
          className={status === s ? 'active' : ''}
          onClick={() => handleStatusChange(s)}
        >
          {s}
        </div>
      ))}
    </div>
  );
};