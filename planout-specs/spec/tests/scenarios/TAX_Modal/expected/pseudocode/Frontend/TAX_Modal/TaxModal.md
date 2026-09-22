/**
 * Component: TaxModal
 * Description: Modal to manage and configure tax settings for the customer.
 * Asset: assets/d7b9ac85-9776-455a-ac17-89ddcf1a46f8.svg
 */

import React, { useState, useEffect } from 'react';

export const TaxModal = ({ customerId, onClose, onSave }) => {
  // State management for form fields
  // Note: Fields are derived from expected API PAYLOADS (currently empty, 
  // so we define placeholders based on the node requirements).
  const [formData, setFormData] = useState({
    NPWP: '',   // ORPHAN_FIELD: NPWP
    NPPKP: '',  // ORPHAN_FIELD: NPPKP
    NITKU: ''   // ORPHAN_FIELD: NITKU
  });

  const [errors, setErrors] = useState({});

  // Validation Logic (Immediate feedback)
  const validateField = (name, value) => {
    let error = '';
    // Example validation rules for tax identifiers
    if (name === 'NPWP' && value.length > 0 && value.length < 15) {
      error = 'NPWP must be at least 15 characters.';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async () => {
    // Logic to persist data via API
    // Since API CONTRACTS is empty, we assume a standard PATCH/POST 
    // to update customer tax settings.
    try {
      await api.post('/customers/tax-settings', {
        NPWP: formData.NPWP,
        NPPKP: formData.NPPKP,
        NITKU: formData.NITKU
      });
      onSave();
    } catch (err) {
      console.error("Failed to save tax settings", err);
    }
  };

  return (
    <div className="modal-container">
      <header>
        <span className="icon-percentage" />
        <h2>TAX</h2>
      </header>

      <div className="form-group">
        <label htmlFor="NPWP">NPWP</label>
        <input
          id="NPWP"
          name="NPWP"
          value={formData.NPWP}
          onChange={handleChange}
          placeholder="Enter tax identification number"
        />
        {errors.NPWP && <span className="error">{errors.NPWP}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="NPPKP">NPPKP</label>
        <input
          id="NPPKP"
          name="NPPKP"
          value={formData.NPPKP}
          onChange={handleChange}
          placeholder="Enter VAT-registered taxpayer number"
        />
      </div>

      <div className="form-group">
        <label htmlFor="NITKU">NITKU</label>
        <input
          id="NITKU"
          name="NITKU"
          value={formData.NITKU}
          onChange={handleChange}
          placeholder="Enter NITKU tax identity number"
        />
      </div>

      <button onClick={handleSubmit} disabled={Object.values(errors).some(e => e !== '')}>
        Save Changes
      </button>
    </div>
  );
};