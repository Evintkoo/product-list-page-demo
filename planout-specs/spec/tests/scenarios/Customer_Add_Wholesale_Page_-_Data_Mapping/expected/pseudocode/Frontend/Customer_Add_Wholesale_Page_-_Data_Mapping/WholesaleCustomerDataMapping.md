/**
 * Component: WholesaleCustomerDataMapping
 * Description: Renders the Data Mapping section for the Wholesale Customer Add form.
 * Asset: assets/c5dd05e5-4348-4473-a0f8-3babc1049513.svg
 */

import React, { useState } from 'react';

export const WholesaleCustomerDataMapping = () => {
  // State management for form fields
  // Note: Fields are derived from API PAYLOADS requirements.
  // Since API PAYLOADS and DATA SCHEMAS are currently empty, 
  // we define the expected state structure based on the UI requirements.
  const [formData, setFormData] = useState({
    salesperson_id: '', // ORPHAN_FIELD: salesperson_id
  });

  const [errors, setErrors] = useState({
    salesperson_id: '',
  });

  /**
   * Validation Logic
   * Triggers immediately on change to ensure data integrity.
   */
  const validateField = (name: string, value: string) => {
    let errorMessage = '';
    
    if (name === 'salesperson_id' && !value) {
      errorMessage = 'Salesperson is required.';
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  return (
    <section className="data-mapping-card">
      <h3>DATA MAPPING</h3>
      
      {/* Salesperson Selection */}
      <div className="form-group">
        <label htmlFor="salesperson_id">
          Salesperson *
        </label>
        <select
          id="salesperson_id"
          value={formData.salesperson_id}
          onChange={(e) => handleInputChange('salesperson_id', e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.salesperson_id}
        >
          <option value="">Select a salesperson</option>
          {/* Options would be populated via a GET /salespersons endpoint */}
        </select>
        {errors.salesperson_id && (
          <span className="error-message">{errors.salesperson_id}</span>
        )}
      </div>
    </section>
  );
};