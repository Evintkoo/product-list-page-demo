import React from 'react';

/**
 * Component: PurchaseReturnDetailPanel
 * Renders the internal details of a Franchise Purchase Return.
 * Asset: assets/6c0f4f06-a49a-4d54-ad10-2c060dba9e39.svg
 */
export const PurchaseReturnDetailPanel = ({ data }) => {
  // Data is expected to be the Purchase Return entity object
  // Fields are mapped from DATA SCHEMAS (authoritative)
  
  return (
    <div className="detail-panel-container">
      <div className="left-column">
        <DetailField label="Document No" value={data.document_no} />
        <DetailField label="Reference No" value={data.reference_no} />
        <DetailField label="Franchise PO No" value={data.franchise_po_no} />
        <DetailField label="From Store" value={data.from_store} />
        <DetailField label="To Supplier" value={data.to_supplier} />
        <DetailField label="To Warehouse" value={data.to_warehouse} />
        <DetailField label="Created By" value={data.created_by} />
        <DetailField label="Updated By" value={data.updated_by} />
        <DetailField label="Notes" value={data.notes} />
      </div>

      <div className="right-column">
        <DetailField label="Created At" value={formatDate(data.created_at)} />
        <DetailField label="Updated At" value={formatDate(data.updated_at)} />
        <DetailField label="Approve Date" value={formatDate(data.approved_date)} />
        <DetailField label="Sent Date" value={formatDate(data.sent_date)} />
        <DetailField label="Journal" value={data.journal_reference} />
      </div>
    </div>
  );
};

/**
 * Helper to render individual detail rows.
 * Handles empty states (null/undefined) by rendering an empty string or placeholder.
 */
const DetailField = ({ label, value }) => (
  <div className="detail-row">
    <span className="label">{label}</span>
    <span className="value">{value || '-'}</span>
  </div>
);

const formatDate = (dateString) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString();
};