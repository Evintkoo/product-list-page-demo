export const WorkflowStatusTracker = ({ state }) => {
  const stages = ['Draft', 'Confirmed', 'Sent', 'Approved'];
  return (
    <div className="workflow-tracker">
      {stages.map(stage => (
        <span key={stage} className={state === stage.toLowerCase() ? 'active' : ''}>
          {stage}
        </span>
      ))}
    </div>
  );
};