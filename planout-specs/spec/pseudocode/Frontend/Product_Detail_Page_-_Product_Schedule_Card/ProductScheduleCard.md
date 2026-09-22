/**
 * Component: ProductScheduleCard
 * Description: Displays the validity date range for a product schedule entry.
 * Asset: assets/e6903326-98de-4a1b-b176-b8f1e0245dec.svg
 */

import React from 'react';

// Props interface derived from DATA SCHEMAS
interface ProductScheduleCardProps {
  // ORPHAN_FIELD: valid_from_date
  // ORPHAN_FIELD: valid_to_date
  valid_from_date: string; 
  valid_to_date: string;
}

export const ProductScheduleCard: React.FC<ProductScheduleCardProps> = ({ 
  valid_from_date, 
  valid_to_date 
}) => {
  
  /**
   * Validation Logic:
   * The component renders read-only data. 
   * If valid_to_date is present and occurs before valid_from_date, 
   * trigger a visual warning state (e.g., text-red-500) to indicate 
   * an invalid schedule configuration.
   */
  const isDateRangeInvalid = new Date(valid_to_date) < new Date(valid_from_date);

  return (
    <div className="product-schedule-card-container">
      <h3>Product Schedule</h3>
      
      <div className="field-group">
        <label>Valid From</label>
        <span className="read-only-value">
          {formatDate(valid_from_date)}
        </span>
      </div>

      <div className="field-group">
        <label>Valid To</label>
        <span className={`read-only-value ${isDateRangeInvalid ? 'error-text' : ''}`}>
          {formatDate(valid_to_date)}
        </span>
      </div>

      {isDateRangeInvalid && (
        <div className="error-message">
          Warning: The end date occurs before the start date.
        </div>
      )}
    </div>
  );
};

/**
 * Helper to format ISO strings into localized date strings
 */
function formatDate(dateString: string): string {
  if (!dateString) return 'N/A';
  return new Intl.DateTimeFormat('en-US').format(new Date(dateString));
}