/**
 * Component: CustomerPricesCard
 * Purpose: Displays the pricing configuration for a specific customer within the Lumi ERP Customer Detail Page.
 * Asset: assets/4a8b4b32-729f-4499-b752-f0e8dcab2ed4.svg
 */

import React from 'react';
import { useCustomerDetails } from './hooks/useCustomerDetails';

export const CustomerPricesCard = ({ customerId }) => {
  // Fetching customer data based on the provided customerId
  const { data: customer, isLoading, error } = useCustomerDetails(customerId);

  if (isLoading) return <div className="skeleton-loader">Loading Prices...</div>;
  if (error) return <div className="error-state">Failed to load pricing information.</div>;

  return (
    <section className="prices-card">
      <header className="prices-header">
        <img src="price-icon.svg" alt="Prices" />
        <h2>Prices</h2>
      </header>

      <div className="prices-content">
        <div className="field-group">
          <label htmlFor="pricelist-display">Pricelist</label>
          {/* 
            Displaying the assigned pricelist. 
            Note: Field name 'pricelist_name' is assumed based on standard ERP entity patterns 
            as it is not explicitly defined in the provided DATA SCHEMAS.
          */}
          <span id="pricelist-display" className="read-only-value">
            {customer.pricelist_name || "N/A"} <!-- ORPHAN_FIELD: pricelist_name -->
          </span>
        </div>
      </div>
    </section>
  );
};