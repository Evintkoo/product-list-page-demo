/**
 * Component: SupplierChangesCard
 * Description: Displays audit trail information for a supplier record, 
 * including creation and update timestamps and user identifiers.
 * Asset: assets/63596fc7-c4d0-40a9-a208-2139f010a5d1.svg
 */

import React from 'react';
import { ClockIcon } from 'lumi-ui-library'; // Hypothetical UI library

interface SupplierChangesProps {
  // Data sourced from Supplier entity
  createdAt: string;    // DATA_SCHEMA: Created At
  updatedAt: string;    // DATA_SCHEMA: Updated At
  createdBy: string;    // DATA_SCHEMA: Created By
  updatedBy: string;    // DATA_SCHEMA: Updated By
}

export const SupplierChangesCard: React.FC<SupplierChangesProps> = ({
  createdAt,
  updatedAt,
  createdBy,
  updatedBy
}) => {
  
  // Helper to format date strings for display consistency
  const formatAuditDate = (dateString: string) => {
    // Logic: Ensure display format matches "02-Dec-2024 11:10 AM"
    return new Date(dateString).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="changes-card-container">
      <div className="card-header">
        <ClockIcon />
        <h3>Changes</h3> <!-- Changes Subtitle -->
      </div>

      <div className="audit-grid">
        <div className="audit-row">
          <label>Created At</label>
          <span className="read-only-value">{formatAuditDate(createdAt)}</span>
        </div>

        <div className="audit-row">
          <label>Created By</label>
          <span className="read-only-value">{createdBy}</span>
        </div>

        <div className="audit-row">
          <label>Updated At</label>
          <span className="read-only-value">{formatAuditDate(updatedAt)}</span>
        </div>

        <div className="audit-row">
          <label>Updated By</label>
          <span className="read-only-value">{updatedBy}</span>
        </div>
      </div>
    </div>
  );
};