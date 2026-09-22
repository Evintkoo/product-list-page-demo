import React from 'react';

/**
 * Component: FranchisePurchaseOrderDetails
 * Renders the internal details panel for Franchise Purchase Orders.
 * Asset: assets/f4afa4b6-76b9-4dc3-b557-9b66c0b1d14f.svg
 */

export const FranchisePurchaseOrderDetails = ({ purchaseOrderData }) => {
  // Data mapping based on authoritative schema fields
  // Note: All fields are read-only display values derived from the purchaseOrderData entity
  
  return (
    <div className="details-panel-container">
      <header>
        <h3>Internal Details</h3>
      </header>

      <section className="details-grid">
        {/* Document Identification */}
        <div className="field-group">
          <label>Document No</label>
          <span>{purchaseOrderData.document_no}</span>
        </div>
        <div className="field-group">
          <label>Reference Number</label>
          <span>{purchaseOrderData.reference_number}</span>
        </div>

        {/* Origin and Destination */}
        <div className="field-group">
          <label>From Warehouse</label>
          <span>{purchaseOrderData.from_warehouse}</span>
        </div>
        <div className="field-group">
          <label>From Supplier</label>
          <span>{purchaseOrderData.from_supplier}</span>
        </div>
        <div className="field-group">
          <label>Deliver To</label>
          <span>{purchaseOrderData.deliver_to}</span>
        </div>

        {/* Timestamps */}
        <div className="field-group">
          <label>Created At</label>
          <span>{purchaseOrderData.created_at}</span>
        </div>
        <div className="field-group">
          <label>Updated At</label>
          <span>{purchaseOrderData.updated_at}</span>
        </div>
        <div className="field-group">
          <label>Sent At</label>
          <span>{purchaseOrderData.sent_at}</span>
        </div>
        <div className="field-group">
          <label>Received Date</label>
          <span>{purchaseOrderData.received_date}</span>
        </div>
        <div className="field-group">
          <label>Due Date</label>
          <span>{purchaseOrderData.due_date}</span>
        </div>

        {/* Audit and Metadata */}
        <div className="field-group">
          <label>Created By</label>
          <span>{purchaseOrderData.created_by}</span>
        </div>
        <div className="field-group">
          <label>Updated By</label>
          <span>{purchaseOrderData.updated_by}</span>
        </div>
        <div className="field-group">
          <label>Journal</label>
          <span>{purchaseOrderData.journal}</span>
        </div>
        <div className="field-group">
          <label>Notes</label>
          <p>{purchaseOrderData.notes}</p>
        </div>
      </section>
    </div>
  );
};

// ORPHAN_FIELD: document_no
// ORPHAN_FIELD: reference_number
// ORPHAN_FIELD: from_warehouse
// ORPHAN_FIELD: from_supplier
// ORPHAN_FIELD: deliver_to
// ORPHAN_FIELD: created_at
// ORPHAN_FIELD: updated_at
// ORPHAN_FIELD: sent_at
// ORPHAN_FIELD: received_date
// ORPHAN_FIELD: due_date
// ORPHAN_FIELD: created_by
// ORPHAN_FIELD: updated_by
// ORPHAN_FIELD: journal
// ORPHAN_FIELD: notes