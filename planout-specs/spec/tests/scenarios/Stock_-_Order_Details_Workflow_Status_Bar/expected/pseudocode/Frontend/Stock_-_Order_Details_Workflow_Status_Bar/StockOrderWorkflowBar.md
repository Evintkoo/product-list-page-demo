import React from 'react';
import { useStockOrderActions } from './hooks/useStockOrderActions';

/**
 * Component: WorkflowStatusBar
 * Displays the progression of a StockOrder through its lifecycle.
 * Asset: assets/347bd33b-05b8-462d-a575-75c0a9699b7f.svg
 */
export const WorkflowStatusBar = ({ stockOrder }) => {
  const { status } = stockOrder;
  const stages = ['DRAFT', 'SENT', 'WAREHOUSE SENT', 'STORE RECEIVED'];

  return (
    <div className="workflow-bar-container">
      <div className="status-progression">
        {stages.map((stage, index) => (
          <React.Fragment key={stage}>
            <div className={`stage-pill ${status === stage ? 'active' : 'pending'}`}>
              {stage}
            </div>
            {index < stages.length - 1 && <span className="chevron-icon"> > </span>}
          </React.Fragment>
        ))}
      </div>
      <ActionButtons stockOrderId={stockOrder.id} />
    </div>
  );
};

const ActionButtons = ({ stockOrderId }) => {
  const { handleConfirm, handleCancel, handlePrint } = useStockOrderActions(stockOrderId);

  return (
    <div className="action-buttons">
      <button onClick={handlePrint} aria-label="Print">Print</button>
      <button onClick={handleConfirm} aria-label="Confirm">Confirm</button>
      <button onClick={handleCancel} aria-label="Cancel">Cancel</button>
    </div>
  );
};