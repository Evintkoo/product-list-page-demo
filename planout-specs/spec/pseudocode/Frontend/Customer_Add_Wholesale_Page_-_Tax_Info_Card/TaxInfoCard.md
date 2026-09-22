/**
 * Component: TaxInfoCard
 * Description: Renders the tax information section for the wholesale customer registration form.
 * Asset: assets/199c22aa-c4b8-49fb-ba5d-e2bb9f586b24.svg
 */

import React, { useState } from 'react';

export const TaxInfoCard = () => {
  // State management for tax fields
  // Note: Field names are derived from the expected API payload structure for wholesale customers
  const [formData, setFormData] = useState({
    npwp: '',   // ORPHAN_FIELD: npwp
    nppkp: '',  // ORPHAN_FIELD: nppkp
    nitku: ''   // ORPHAN_FIELD: nitku
  });

  const [errors, setErrors] = useState({
    npwp: '',
    nppkp: '',
    nitku: ''
  });

  // Validation logic triggered immediately on change
  const validateField = (name, value) => {
    let error = '';
    
    // General validation: Tax numbers typically follow specific numeric patterns
    // Regex placeholders for standard Indonesian tax formats
    if (name === 'npwp' && value.length > 0 && !/^\d{15,16}$/.test(value.replace(/[-.]/g, ''))) {
      error = 'Invalid NPWP format. Must be 15 or 16 digits.';
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  return (
    <div className="tax-info-card">
      <h3>Tax Information</h3> {/* Tax Header */}
      
      <div className="form-group">
        <label htmlFor="npwp">NPWP</label>
        <input
          id="npwp"
          name="npwp"
          type="text"
          value={formData.npwp}
          onChange={handleChange}
          placeholder="Enter NPWP number"
        />
        {errors.npwp && <span className="error-text">{errors.npwp}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="nppkp">NPPKP</label>
        <input
          id="nppkp"
          name="nppkp"
          type="text"
          value={formData.nppkp}
          onChange={handleChange}
          placeholder="Enter NPPKP number"
        />
        {errors.nppkp && <span className="error-text">{errors.nppkp}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="nitku">NITKU</label>
        <input
          id="nitku"
          name="nitku"
          type="text"
          value={formData.nitku}
          onChange={handleChange}
          placeholder="Enter NITKU number"
        />
        {errors.nitku && <span className="error-text">{errors.nitku}</span>}
      </div>
    </div>
  );
};