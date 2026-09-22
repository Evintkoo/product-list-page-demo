/**
 * Renders the workflow header based on the current workflow_state.
 */
const HeaderSection = ({ invoice, onAction }) => {
  const { workflow_state } = invoice;

  return (
    <div className="header-container">
      <h1>Sales Invoice: {invoice.ref_code}</h1>
      <WorkflowTracker state={workflow_state} />
      
      <div className="actions">
        {workflow_state === 'draft' && (
          <>
            <button onClick={() => onAction('approve')}>Approve</button>
            <button onClick={() => onAction('send')}>Send Invoice</button>
            <button onClick={() => onAction('cancel')}>Cancel</button>
          </>
        )}
        {workflow_state === 'approved' && (
          <>
            <button onClick={() => onAction('send')}>Send Invoice</button>
            <button onClick={() => onAction('reset')}>Reset</button>
          </>
        )}
        {/* Additional states (sent, paid, cancelled) follow similar logic */}
      </div>
    </div>
  );
};