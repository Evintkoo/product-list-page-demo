/**
 * Component: TaxCard
 * Description: Displays read-only tax information for the product detail page.
 * Asset: assets/98d5e998-ad51-4e4a-a73c-56e16ab3fa53.svg
 */

import React from 'react';

// The component consumes product data from the parent detail page context.
// Fields are read-only as per requirements.
export const TaxCard = ({ productData }) => {
  
  // Data mapping based on DATA SCHEMAS (assuming productData contains these fields)
  // Note: If fields are missing from the schema, they are marked as orphans.
  const taxUnitOfMeasure = productData.tax_unit_of_measure; // <!-- ORPHAN_FIELD: tax_unit_of_measure -->
  const taxProductCode = productData.tax_product_code;     // <!-- ORPHAN_FIELD: tax_product_code -->
  const tax = productData.tax;                             // <!-- ORPHAN_FIELD: tax -->

  return (
    <div className="tax-card-container">
      <h3>Tax Information</h3>
      
      <div className="field-group">
        <label>Tax</label>
        <span className="read-only-value">
          {tax || 'N/A'}
        </span>
      </div>

      <div className="field-group">
        <label>Tax Product Code</label>
        <span className="read-only-value">
          {taxProductCode || 'N/A'}
        </span>
      </div>

      <div className="field-group">
        <label>Tax Unit of Measure</label>
        <span className="read-only-value">
          {taxUnitOfMeasure || 'N/A'}
        </span>
      </div>
    </div>
  );
};