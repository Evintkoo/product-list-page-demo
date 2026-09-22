/**
 * Component: CreditTermsCard
 * Description: A form section for managing supplier credit terms, including credit limits and payment duration.
 * Asset: assets/1bc627b2-70b6-46c3-af45-6f583faf4f59.svg
 */

import React, { useState } from 'react';

export const CreditTermsCard = ({ initialData = {} }) => {
  // State management for form fields
  // Note: Field names are derived from expected API payload requirements
  const [formData, setFormData] = useState({
    credit_limit: initialData.credit_limit || '', // ORPHAN_FIELD: credit_limit
    credit_term_days: initialData.credit_term_days || '' // ORPHAN_FIELD: credit_term_days
  });

  const [errors, setErrors] = useState({});

  // Validation Logic
  const validate = (name, value) => {
    let errorMsg = '';
    
    if (name === 'credit_term_days') {
      if (!value || value <= 0) {
        errorMsg = 'Credit term days are required and must be a positive number.';
      }
    }
    
    if (name === 'credit_limit') {
      if (value && value < 0) {
        errorMsg = 'Credit limit cannot be negative.';
      }
    }

    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? '' : Number(value);
    
    setFormData(prev => ({ ...prev, [name]: numericValue }));
    validate(name, numericValue);
  };

  return (
    <div className="credit-terms-card">
      {/* Header Section */}
      <div className="header">
        <span className="icon-credit-card" />
        <h3>Credit Terms</h3>
      </div>

      {/* Credit Term (Days) Field */}
      <div className="form-group">
        <label htmlFor="credit_term_days">
          Credit Term (Days) *
          <span className="tooltip-trigger" title="The number of days allowed for payment after invoice receipt.">
            <span className="icon-question-mark" />
          </span>
        </label>
        <div className="input-wrapper">
          <span className="icon-date-picker" />
          <input
            type="number"
            id="credit_term_days"
            name="credit_term_days"
            value={formData.credit_term_days}
            onChange={handleChange}
            required
          />
        </div>
        {errors.credit_term_days && <span className="error">{errors.credit_term_days}</span>}
      </div>

      {/* Credit Limit Field */}
      <div className="form-group">
        <label htmlFor="credit_limit">Maximum Credit Limit</label>
        <input
          type="number"
          id="credit_limit"
          name="credit_limit"
          value={formData.credit_limit}
          onChange={handleChange}
          placeholder="Enter amount"
        />
        {errors.credit_limit && <span className="error">{errors.credit_limit}</span>}
      </div>
    </div>
  );
};