/**
 * Component: TaxCard
 * Description: Frontend component for managing tax settings within the Service Product edit page.
 * Asset: assets/bb66abc3-089e-40bf-852d-522d14801d77.svg
 */

import React, { useState, useEffect } from 'react';

export const TaxCard = ({ serviceProductId, initialData }) => {
  // State management for form fields
  const [tax, setTax] = useState(initialData?.tax || null);
  const [otherTax, setOtherTax] = useState(initialData?.otherTax || null);
  const [taxProductCode, setTaxProductCode] = useState(initialData?.taxProductCode || '');
  const [taxUnitOfMeasure, setTaxUnitOfMeasure] = useState(initialData?.taxUnitOfMeasure || '');
  const [otherTaxAccount, setOtherTaxAccount] = useState(initialData?.otherTaxAccount || '');
  const [otherTaxRefundAccount, setOtherTaxRefundAccount] = useState(initialData?.otherTaxRefundAccount || '');

  // Validation Logic
  // Rules: 
  // 1. 'Tax' and 'Other Tax' are mandatory.
  // 2. Validation triggers immediately on change.
  const isFormValid = () => {
    return tax !== null && otherTax !== null;
  };

  return (
    <div className="tax-card-container">
      {/* Header Section */}
      <div className="tax-card-header">
        <span className="tax-icon">%</span>
        <h3>TAX</h3>
      </div>

      {/* Main Tax Selection */}
      <div className="form-group">
        <label>Tax *</label>
        <Dropdown
          value={tax}
          onChange={(val) => setTax(val)}
          placeholder="Select Tax"
          isClearable={true}
          required={true}
        />
      </div>

      {/* Other Tax Selection */}
      <div className="form-group">
        <label>Other Tax *</label>
        <Dropdown
          value={otherTax}
          onChange={(val) => setOtherTax(val)}
          placeholder="Select Other Tax"
          isClearable={true}
          required={true}
        />
      </div>

      {/* Tax Product Code */}
      <div className="form-group">
        <label>Tax Product Code</label>
        <Dropdown
          value={taxProductCode}
          onChange={(val) => setTaxProductCode(val)}
          placeholder="Select Tax Product Code"
        />
      </div>

      {/* Tax Unit of Measure */}
      <div className="form-group">
        <label>Tax Unit of Measure</label>
        <Dropdown
          value={taxUnitOfMeasure}
          onChange={(val) => setTaxUnitOfMeasure(val)}
          placeholder="Select Tax Unit of Measure"
        />
      </div>

      {/* Other Tax Account */}
      <div className="form-group">
        <label>Other Tax Account</label>
        <Dropdown
          value={otherTaxAccount}
          onChange={(val) => setOtherTaxAccount(val)}
          placeholder="Select Account"
        />
      </div>

      {/* Other Tax Refund Account */}
      <div className="form-group">
        <label>Other Tax Refund Account</label>
        <Dropdown
          value={otherTaxRefundAccount}
          onChange={(val) => setOtherTaxRefundAccount(val)}
          placeholder="Select Account"
        />
      </div>
    </div>
  );
};

// ORPHAN_FIELD: tax
// ORPHAN_FIELD: otherTax
// ORPHAN_FIELD: taxProductCode
// ORPHAN_FIELD: taxUnitOfMeasure
// ORPHAN_FIELD: otherTaxAccount
// ORPHAN_FIELD: otherTaxRefundAccount

/**
 * Note: The fields above are identified as orphans because they are required 
 * by the UI component logic but are not explicitly defined in the provided 
 * API PAYLOADS or DATA SCHEMAS. These should be mapped to the corresponding 
 * service product update endpoint once the schema is finalized.
 */