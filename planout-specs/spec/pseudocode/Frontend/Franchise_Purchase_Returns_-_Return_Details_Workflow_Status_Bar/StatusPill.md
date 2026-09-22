/**
 * Component: StatusPill
 * Displays individual workflow stages.
 * Logic: 
 * - Active stage: Solid styling.
 * - Completed stage: Visual indicator of completion.
 * - Pending stage: Default/muted styling.
 */

export const StatusPill = ({ label, isActive, isCompleted }) => {
  const getClassName = () => {
    if (isActive) return 'pill-active';
    if (isCompleted) return 'pill-completed';
    return 'pill-pending';
  };

  return (
    <div className={`status-pill ${getClassName()}`}>
      {label}
    </div>
  );
};

// ORPHAN_FIELD: currentStatus (Used to track workflow progression)
// ORPHAN_FIELD: Purchase Return Send Response (Schema reference)
// ORPHAN_FIELD: Purchase Return Cancel Response (Schema reference)