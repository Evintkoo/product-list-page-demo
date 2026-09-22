/**
 * Component: ChangesCard
 * Description: Displays audit trail information for a service product record.
 * Asset: assets/0a788b34-a04a-44ed-a18e-bbdc215dc880.svg
 */

import React from 'react';
import { ClockIcon } from './icons'; // Placeholder for history icon

interface ChangesCardProps {
  // Data sourced from the Service Product entity
  created_by_name: string;      // ORPHAN_FIELD: created_by_name
  created_by_email: string;     // ORPHAN_FIELD: created_by_email
  created_at: string;           // DATA_SCHEMA: created_at
  updated_by_name: string;      // ORPHAN_FIELD: updated_by_name
  updated_by_email: string;     // ORPHAN_FIELD: updated_by_email
  updated_at: string;           // DATA_SCHEMA: updated_at
}

export const ChangesCard: React.FC<ChangesCardProps> = ({
  created_by_name,
  created_by_email,
  created_at,
  updated_by_name,
  updated_by_email,
  updated_at
}) => {
  
  // Helper to format user display string
  const formatUser = (name: string, email: string) => `${name} (${email})`;

  return (
    <div className="changes-card-container">
      {/* Header Section */}
      <div className="changes-card-header">
        <ClockIcon className="history-icon" />
        <span className="blue-label">CHANGES</span>
      </div>

      {/* Content Grid */}
      <div className="changes-card-body">
        
        {/* Created By Field */}
        <div className="field-group">
          <label>Created By</label>
          <div className="field-value">
            {formatUser(created_by_name, created_by_email)}
          </div>
        </div>

        {/* Created At Field */}
        <div className="field-group">
          <label>Created At</label>
          <div className="field-value">
            {new Date(created_at).toLocaleString('en-GB', { 
              day: '2-digit', month: 'short', year: 'numeric', 
              hour: '2-digit', minute: '2-digit', hour12: true 
            })}
          </div>
        </div>

        {/* Updated By Field */}
        <div className="field-group">
          <label>Updated By</label>
          <div className="field-value">
            {formatUser(updated_by_name, updated_by_email)}
          </div>
        </div>

        {/* Updated At Field */}
        <div className="field-group">
          <label>Updated At</label>
          <div className="field-value">
            {new Date(updated_at).toLocaleString('en-GB', { 
              day: '2-digit', month: 'short', year: 'numeric', 
              hour: '2-digit', minute: '2-digit', hour12: true 
            })}
          </div>
        </div>

      </div>
    </div>
  );
};