/**
 * Component: TaxCard
 * Description: Frontend component for managing tax settings within the Service Product page.
 * Asset: assets/cda2f2ac-ca5a-4aab-b320-7698b568862c.svg
 */

import React, { useState, useEffect } from 'react';

export const TaxCard = () => {
  // State management for form fields
  const [formData, setFormData] = useState({
    tax_id: '', // Maps to "Tax"
    other_tax_id: '', // Maps to "Other Tax"
    tax_uom_id: '', // Maps to "Tax Unit of Measure"
    tax_product_code: '', // Maps to "Tax Product Code"
    other_tax_account_id: '100.104.003', // Defaulting to PPH 23 account
    other_tax_refund_account_id: '100.104.003' // Defaulting to PPH 23 account
  });

  const [errors, setErrors] = useState({});

  // Validation Logic
  const validate = (name, value) => {
    let error = '';
    if ((name === 'tax_id' || name === 'other_tax_id') && !value) {
      error = 'This field is required.';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  return (
    <div className="tax-card-container">
      {/* Tax Subtitle */}
      <div className="tax-subtitle-label">% TAX</div>

      {/* Main Tax Selection */}
      <div className="form-group">
        <label>Tax</label>
        <Select 
          name="tax_id"
          value={formData.tax_id}
          onChange={(val) => handleChange('tax_id', val)}
          required
        />
        {errors.tax_id && <span className="error">{errors.tax_id}</span>}
      </div>

      {/* Other Tax Selection (PPh 23) */}
      <div className="form-group">
        <label>Other Tax</label>
        <Select 
          name="other_tax_id"
          value={formData.other_tax_id}
          onChange={(val) => handleChange('other_tax_id', val)}
          required
        />
        {errors.other_tax_id && <span className="error">{errors.other_tax_id}</span>}
      </div>

      {/* Tax Unit of Measure */}
      <div className="form-group">
        <label>Tax Unit of Measure</label>
        <Select 
          name="tax_uom_id"
          value={formData.tax_uom_id}
          onChange={(val) => handleChange('tax_uom_id', val)}
        />
      </div>

      {/* Tax Product Code */}
      <div className="form-group">
        <label>Tax Product Code</label>
        <Select 
          name="tax_product_code"
          value={formData.tax_product_code}
          onChange={(val) => handleChange('tax_product_code', val)}
        />
      </div>

      {/* Other Tax Account */}
      <div className="form-group">
        <label>Other Tax Account</label>
        <Select 
          name="other_tax_account_id"
          value={formData.other_tax_account_id}
          onChange={(val) => handleChange('other_tax_account_id', val)}
        />
      </div>

      {/* Other Tax Refund Account */}
      <div className="form-group">
        <label>Other Tax Refund Account</label>
        <Select 
          name="other_tax_refund_account_id"
          value={formData.other_tax_refund_account_id}
          onChange={(val) => handleChange('other_tax_refund_account_id', val)}
        />
      </div>
    </div>
  );
};

// ORPHAN_FIELD: tax_id
// ORPHAN_FIELD: other_tax_id
// ORPHAN_FIELD: tax_uom_id
// ORPHAN_FIELD: tax_product_code
// ORPHAN_FIELD: other_tax_account_id
// ORPHAN_FIELD: other_tax_refund_account_id