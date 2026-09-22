/**
 * Component: SupplierNotesCard
 * Description: A card component for the Supplier Form that allows users to input 
 * free-text notes and bank details.
 * Asset: assets/338cfb8d-f46c-40de-b147-aca3fabda70f.svg
 */

import React, { useState, useEffect } from 'react';

export const SupplierNotesCard = ({ supplierId, initialData }) => {
  // State management for form fields
  // Note: Fields are derived from expected API PAYLOADS/DATA SCHEMAS
  const [formData, setFormData] = useState({
    notes: initialData?.notes || '', // ORPHAN_FIELD: notes
    bank_details: initialData?.bank_details || '' // ORPHAN_FIELD: bank_details
  });

  const [errors, setErrors] = useState({});

  // Validation Logic (Immediate feedback)
  const validateField = (name, value) => {
    let error = '';
    if (name === 'notes' && value.length > 2000) {
      error = 'Notes cannot exceed 2000 characters.';
    }
    // Bank details validation (e.g., regex for IBAN or account format)
    if (name === 'bank_details' && value.length > 500) {
      error = 'Bank details cannot exceed 500 characters.';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  return (
    <div className="notes-card-container">
      {/* Notes Section Header */}
      <div className="notes-header">
        <span className="notes-icon" aria-hidden="true" />
        <h3>Supplier Notes & Banking</h3>
      </div>

      {/* Notes Field */}
      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Enter additional context or comments..."
        />
        {errors.notes && <span className="error-text">{errors.notes}</span>}
      </div>

      {/* Bank Details Field */}
      <div className="form-group">
        <label htmlFor="bank_details">Bank Details</label>
        <input
          type="text"
          id="bank_details"
          name="bank_details"
          value={formData.bank_details}
          onChange={handleChange}
          placeholder="Enter bank account information"
        />
        {errors.bank_details && <span className="error-text">{errors.bank_details}</span>}
      </div>
    </div>
  );
};