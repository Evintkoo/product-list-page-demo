/**
 * Component: TaxCard
 * Description: Displays the tax configuration details for a Service Product.
 * Asset: assets/58cd0e7d-61c1-495f-8ad2-6490afa3c4f1.svg
 */

import React from 'react';

export const TaxCard = ({ serviceProductData }) => {
  // Data mapping from serviceProductData entity
  // Note: Fields are read-only as per requirements.
  
  const renderField = (label, value) => (
    <div className="tax-field-row">
      <span className="field-label">{label}</span>
      <span className="field-value">{value || '-'}</span>
    </div>
  );

  return (
    <div className="tax-card-container">
      {/* Header Section */}
      <div className="tax-card-header">
        <span className="tax-badge">
          <IconPercent /> TAX
        </span>
      </div>

      {/* Content Section */}
      <div className="tax-card-body">
        {renderField("Tax", serviceProductData.tax_name)}
        {renderField("Tax Unit of Measure", serviceProductData.tax_uom)}
        {renderField("Tax Product Code", serviceProductData.tax_product_code)}
        {renderField("Other Tax", serviceProductData.other_tax_name)}
        {renderField("Other Tax Account", serviceProductData.other_tax_account_label)}
        {renderField("Other Tax Refund Account", serviceProductData.other_tax_refund_account_label)}
      </div>
    </div>
  );
};