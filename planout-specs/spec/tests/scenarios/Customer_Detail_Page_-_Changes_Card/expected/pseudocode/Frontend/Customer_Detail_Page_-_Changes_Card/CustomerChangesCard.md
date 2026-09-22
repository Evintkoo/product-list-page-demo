/**
 * Component: CustomerChangesCard
 * Description: Displays the audit trail/identity metadata for a customer record.
 * All fields are read-only and derived from the Customer entity.
 * Asset: assets/975523ab-3292-441c-8afb-326c431b9b4c.svg
 */

import React from 'react';

// Props interface based on Customer entity schema
interface CustomerChangesCardProps {
  customerData: {
    created_at: string;    // ISO Date string
    updated_at: string;    // ISO Date string
    created_by: string;    // User identifier/name
    updated_by: string;    // User identifier/name
    source: string;        // Origin of the update
  };
}

export const CustomerChangesCard: React.FC<CustomerChangesCardProps> = ({ customerData }) => {
  
  // Helper to format date strings for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="changes-card-container">
      <h3>Customer Changes</h3>
      
      <div className="field-group">
        <label>Created At</label>
        <span className="read-only-value">
          {formatDate(customerData.created_at)}
        </span>
      </div>

      <div className="field-group">
        <label>Updated At</label>
        <span className="read-only-value">
          {formatDate(customerData.updated_at)}
        </span>
      </div>

      <div className="field-group">
        <label>Created By</label>
        <span className="read-only-value">
          {customerData.created_by}
        </span>
      </div>

      <div className="field-group">
        <label>Updated By</label>
        <span className="read-only-value">
          {customerData.updated_by}
        </span>
      </div>

      <div className="field-group">
        <label>Source</label>
        <span className="read-only-value">
          {customerData.source}
        </span>
      </div>
    </div>
  );
};

// Note: All fields are strictly read-only as per requirements.
// No validation logic is required as there are no user inputs.
// Data is expected to be passed from the parent Customer Detail Page component.