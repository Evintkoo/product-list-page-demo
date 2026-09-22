import React from 'react';

/**
 * Component: ChangesCard
 * Description: Displays the audit trail for a product record, including creation and update metadata.
 * Asset: assets/f3669005-22fe-4f87-a8f4-0b0a6721ab86.svg
 */

interface ChangesCardProps {
  // Data sourced from Product entity
  createdAt: string;    // <!-- ORPHAN_FIELD: Created At -->
  updatedAt: string;    // <!-- ORPHAN_FIELD: Updated At -->
  updatedBy: string;    // <!-- ORPHAN_FIELD: Updated By -->
  actionType: string;   // <!-- ORPHAN_FIELD: action -->
}

export const ChangesCard: React.FC<ChangesCardProps> = ({ 
  createdAt, 
  updatedAt, 
  updatedBy, 
  actionType 
}) => {
  
  // Helper to format date strings for display
  const formatDisplayDate = (dateString: string) => {
    // Logic to parse ISO string and return "DD-MMM-YYYY hh:mm AM/PM"
    return dateString; 
  };

  return (
    <div className="changes-card-container">
      <h3>Product Audit Trail</h3>
      
      <div className="audit-field">
        <label>Created At</label>
        <span className="read-only-value">
          {formatDisplayDate(createdAt)}
        </span>
      </div>

      <div className="audit-field">
        <label>Updated At</label>
        <span className="read-only-value">
          {formatDisplayDate(updatedAt)}
        </span>
      </div>

      <div className="audit-field">
        <label>Updated By</label>
        <span className="read-only-value">
          {/* Displays user name with action in parentheses */}
          {updatedBy} ({actionType})
        </span>
      </div>
    </div>
  );
};