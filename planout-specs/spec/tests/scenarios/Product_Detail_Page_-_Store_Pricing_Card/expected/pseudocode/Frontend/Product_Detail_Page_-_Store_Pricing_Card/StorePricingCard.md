/**
 * Component: StorePricingCard
 * Description: Displays the store-level financial details for a product on the detail page.
 * Asset: assets/651d7201-937b-47b6-af1d-05800d88467c.svg
 */

import React from 'react';

// Note: Data schemas are currently empty. 
// Fields below are derived from the node descriptions.
interface StorePricingProps {
  supplyPrice: number;      // ORPHAN_FIELD: supplyPrice
  retailPrice: number;      // ORPHAN_FIELD: retailPrice
  taxInclusiveAmount: number; // ORPHAN_FIELD: taxInclusiveAmount
}

export const StorePricingCard: React.FC<StorePricingProps> = ({ 
  supplyPrice, 
  retailPrice, 
  taxInclusiveAmount 
}) => {

  return (
    <div className="store-pricing-card">
      <h3>Store Pricing</h3>

      {/* Supply Price Section */}
      <div className="pricing-row">
        <label>
          Supply Price (IDR)
          <span className="help-icon" title="Store Purchase Price (Includes Tax)">?</span>
        </label>
        <div className="value-display">
          {formatCurrency(supplyPrice)}
        </div>
      </div>

      {/* Retail Price Section */}
      <div className="pricing-row">
        <label>
          Retail Price (IDR)
          <span className="help-icon" title="Store Sale Price">?</span>
        </label>
        <div className="value-display">
          {formatCurrency(retailPrice)} ({formatCurrency(taxInclusiveAmount)} Inc Tax)
        </div>
      </div>
    </div>
  );
};

/**
 * Helper to format numbers as IDR currency strings
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    minimumFractionDigits: 0
  }).format(value);
}