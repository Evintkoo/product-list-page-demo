/**
 * Component: CreditTermsCard
 * Description: Displays the supplier's credit limit and credit term days.
 * Asset: assets/5f4ffabf-5713-4045-a16a-c49ea9713688.svg
 */

import React from 'react';

// The component receives supplier data as props.
// Note: Since DATA SCHEMAS is empty, we reference the fields implied by the nodes.
interface CreditTermsCardProps {
  supplierData: {
    credit_limit: number; // ORPHAN_FIELD: credit_limit
    credit_term_days: number; // ORPHAN_FIELD: credit_term_days
  };
}

export const CreditTermsCard: React.FC<CreditTermsCardProps> = ({ supplierData }) => {
  
  // Helper to format currency for Credit Limit
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="credit-terms-card-container">
      {/* Header Section */}
      <div className="card-header">
        <span className="card-icon" aria-hidden="true">💳</span>
        <h2>Credit Terms</h2>
      </div>

      {/* Content Section */}
      <div className="card-body">
        <div className="field-group">
          <label>Credit Limit</label>
          <div className="read-only-value">
            {formatCurrency(supplierData.credit_limit)}
          </div>
        </div>

        <div className="field-group">
          <label>Credit Term (Days)</label>
          <div className="read-only-value">
            {supplierData.credit_term_days} days
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== LOGIC NOTES =====
/**
 * 1. Data Fetching: This component expects the parent page to have already 
 *    fetched the supplier details.
 * 2. Read-Only Enforcement: Fields are rendered as static text/divs, 
 *    ensuring no user interaction or state modification is possible.
 * 3. Formatting: 
 *    - Credit Limit: Formatted as Rupiah (IDR) using standard locale formatting.
 *    - Credit Term (Days): Displayed as a raw integer followed by the 'days' suffix.
 */