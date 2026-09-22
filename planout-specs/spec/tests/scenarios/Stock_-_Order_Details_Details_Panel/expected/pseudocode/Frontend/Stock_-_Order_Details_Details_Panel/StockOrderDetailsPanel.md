/**
 * Component: StockOrderDetailsPanel
 * Displays the comprehensive details of a selected stock order.
 * Asset: assets/5634d32b-286e-4758-9e08-48046651a8f0.svg
 */

import React from 'react';

export const StockOrderDetailsPanel = ({ orderData }) => {
  // Data mapping based on authoritative schema fields
  // Note: Fields are read-only display components as per the detail panel requirements.
  
  return (
    <div className="stock-order-details-panel">
      <div className="left-column">
        <DetailField label="Ref Code" value={orderData.ref_code} />
        <DetailField label="Reference Number" value={orderData.reference_number} />
        <DetailField label="From Warehouse" value={orderData.source_warehouse} />
        <DetailField label="Deliver To" value={orderData.delivery_destination} />
        <DetailField label="Created By" value={orderData.created_by} />
        <DetailField label="Updated By" value={orderData.last_updated_by} />
        <DetailField label="Notes" value={orderData.notes} />
      </div>

      <div className="right-column">
        <DetailField label="Created At" value={formatDate(orderData.created_at)} />
        <DetailField label="Updated At" value={formatDate(orderData.last_updated_at)} />
        <DetailField label="Confirmed Date" value={formatDate(orderData.confirmed_date)} />
        <DetailField label="Sent Date" value={formatDate(orderData.sent_date)} />
        <DetailField label="Received Date" value={formatDate(orderData.received_date)} />
        <DetailField label="Source" value={orderData.order_source} />
        <DetailField label="Journal" value={orderData.journal_reference} />
      </div>
    </div>
  );
};

/**
 * Helper component for consistent field rendering
 */
const DetailField = ({ label, value }) => (
  <div className="detail-field">
    <span className="label">{label}</span>
    <span className="value">{value || '—'}</span>
  </div>
);

/**
 * Helper to format timestamps
 */
const formatDate = (dateString) => {
  if (!dateString) return null;
  return new Date(dateString).toLocaleDateString();
};

// ORPHAN_FIELD: ref_code
// ORPHAN_FIELD: reference_number
// ORPHAN_FIELD: source_warehouse
// ORPHAN_FIELD: delivery_destination
// ORPHAN_FIELD: created_by
// ORPHAN_FIELD: last_updated_by
// ORPHAN_FIELD: notes
// ORPHAN_FIELD: created_at
// ORPHAN_FIELD: last_updated_at
// ORPHAN_FIELD: confirmed_date
// ORPHAN_FIELD: sent_date
// ORPHAN_FIELD: received_date
// ORPHAN_FIELD: order_source
// ORPHAN_FIELD: journal_reference