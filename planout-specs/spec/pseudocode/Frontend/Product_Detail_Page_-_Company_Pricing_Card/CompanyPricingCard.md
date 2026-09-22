/**
 * Component: CompanyPricingCard
 * Description: Displays the internal company pricing structure for a product, 
 * including supplier costs and wholesale pricing tiers.
 * Asset: assets/0a90c4d9-71af-45bd-97e8-ec81261ed0db.svg
 */

import React from 'react';
import { useProductPricing } from './hooks/useProductPricing';

export const CompanyPricingCard = ({ productId }) => {
  const { data, isLoading, error } = useProductPricing(productId);

  if (isLoading) return <div className="skeleton-loader">Loading Pricing...</div>;
  if (error) return <div className="error-state">Unable to load pricing data.</div>;

  return (
    <div className="pricing-card-container">
      <h3>Company Pricing</h3>
      
      {/* Company Supply Price Section */}
      <div className="pricing-row">
        <label>
          Company Supply Price (IDR)
          <span className="help-icon" title="Company Purchase Price from Supplier (Includes Tax)">?</span>
        </label>
        <span className="read-only-value">
          {/* ORPHAN_FIELD: company_supply_price_idr */}
          {data.company_supply_price_idr}
        </span>
      </div>

      {/* Wholesale Price Section */}
      <div className="pricing-row">
        <label>
          Wholesale Price (IDR)
          <span className="help-icon" title="Sale Price to Wholesale Customers">?</span>
        </label>
        <span className="read-only-value">
          {/* ORPHAN_FIELD: wholesale_price_idr */}
          {/* ORPHAN_FIELD: wholesale_tax_inclusive_amount */}
          {data.wholesale_price_idr} ({data.wholesale_tax_inclusive_amount} Inc Tax)
        </span>
      </div>
    </div>
  );
};