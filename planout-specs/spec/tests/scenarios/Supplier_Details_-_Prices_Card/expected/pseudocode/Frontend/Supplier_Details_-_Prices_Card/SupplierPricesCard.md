/**
 * Component: SupplierPricesCard
 * Description: Displays the price list configuration for a specific supplier.
 * Asset: assets/f8b57695-52db-4c3d-a27e-5a1cfcfe60e8.svg
 */

import React, { useEffect, useState } from 'react';

export const SupplierPricesCard = ({ supplierId }) => {
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetching supplier price configuration
  // Note: API CONTRACTS is empty, assuming standard GET pattern for supplier details
  useEffect(() => {
    fetch(`/suppliers/${supplierId}/prices`)
      .then(response => response.json())
      .then(data => {
        setPriceData(data);
        setLoading(false);
      });
  }, [supplierId]);

  if (loading) return <div className="skeleton-loader">Loading Prices...</div>;

  return (
    <div className="prices-card-container">
      {/* Header Section */}
      <div className="card-header">
        <Icon name="dollar-sign" />
        <h2>Prices</h2>
      </div>

      {/* Content Section */}
      <div className="card-content">
        <div className="field-group">
          <label htmlFor="pricelist">Pricelist</label>
          {/* 
            Pricelist is a read-only field. 
            Data source: DATA SCHEMAS (Entity: Supplier, Field: pricelist)
          */}
          <input
            type="text"
            id="pricelist"
            value={priceData.pricelist} 
            readOnly
            disabled
            className="read-only-input"
          />
        </div>
      </div>
    </div>
  );
};