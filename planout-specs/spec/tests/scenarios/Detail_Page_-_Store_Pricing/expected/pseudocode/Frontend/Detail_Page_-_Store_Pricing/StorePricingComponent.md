/**
 * Component: StorePricingComponent
 * Description: Displays the pricing details for a specific service product within the Lumi ERP.
 * Asset: assets/76a501f1-ba1b-4b88-b2c1-ea8f4212a322.svg
 */

import React from 'react';

// Note: Data schemas are currently empty. 
// Fields below are derived from the component requirements.
interface StorePricingProps {
  basePrice: number; // ORPHAN_FIELD: basePrice
  taxInclusivePrice: number; // ORPHAN_FIELD: taxInclusivePrice
  currency: string; // ORPHAN_FIELD: currency
}

export const StorePricingComponent: React.FC<StorePricingProps> = ({ 
  basePrice, 
  taxInclusivePrice, 
  currency = "IDR" 
}) => {
  
  // Helper to format currency string
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="store-pricing-card">
      {/* Header Section */}
      <div className="header">
        <span className="icon-dollar" aria-hidden="true">$</span>
        <h3 className="blue-label">STORE PRICING</h3>
      </div>

      {/* Pricing Display Section */}
      <div className="pricing-content">
        <label htmlFor="price-display">Price</label>
        <div id="price-display" className="price-value">
          {/* 
            Requirement: Display store price in IDR with tax-inclusive amount in parentheses.
            Example: 0 (0 Inc Tax)
          */}
          <span>
            {formatCurrency(basePrice)} ({formatCurrency(taxInclusivePrice)} Inc Tax)
          </span>
        </div>
      </div>
    </div>
  );
};