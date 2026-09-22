// Asset: assets/9341363d-ba61-407c-8d6a-47f80b61b1a7.svg (Draft)
// Asset: assets/24938d2a-6937-4164-8d41-69506de079bc.svg (Approved)
// Asset: assets/3c347b53-438e-4327-9b29-111c3c4a62d9.svg (Delivered)

export const WorkflowStatusBar = ({ status }) => {
  return (
    <div className="status-bar">
      <span className={status === 'DRAFT' ? 'active' : ''}>Draft</span>
      <span className={status === 'APPROVED' ? 'active' : ''}>Approved</span>
      <span className={status === 'DELIVERED' ? 'active' : ''}>Delivered</span>
    </div>
  );
};