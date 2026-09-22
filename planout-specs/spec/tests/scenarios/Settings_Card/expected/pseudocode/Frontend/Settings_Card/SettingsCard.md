/**
 * Component: SettingsCard
 * Description: A card component grouping general configuration options for the customer.
 * Asset: assets/0c35e385-97b1-4bb0-b31a-5bf17387b636.svg
 */

import React, { useState, useEffect } from 'react';

export const SettingsCard = ({ customerId }) => {
  // State for form fields
  // Note: Fields are derived from the requirement to manage customer configuration
  const [formData, setFormData] = useState({
    tax_id: '' // ORPHAN_FIELD: tax_id (Referenced in node 72bd6aff)
  });

  const [taxOptions, setTaxOptions] = useState([]);

  // Fetch initial configuration data
  useEffect(() => {
    // Fetch available tax rates for the dropdown
    fetch('/taxes') 
      .then(res => res.json())
      .then(data => setTaxOptions(data));
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Immediate Validation Logic
    validateField(field, value);
  };

  const validateField = (field, value) => {
    if (field === 'tax_id' && !value) {
      // Trigger UI error state if tax_id is required
      console.error("Service Tax is required.");
    }
  };

  return (
    <div className="settings-card-container">
      {/* Settings Header */}
      <div className="settings-header">
        <SettingsIcon /> {/* 7df03291-f0f0-4f68-994c-70f8993a01de */}
        <h2>SETTINGS</h2> {/* 00b76d36-5b51-4059-bb91-939ff5567cba */}
      </div>

      {/* Service Tax Dropdown */}
      <div className="form-group">
        <label htmlFor="tax_id">Service Tax</label>
        <select
          id="tax_id"
          value={formData.tax_id}
          onChange={(e) => handleInputChange('tax_id', e.target.value)}
        >
          <option value="">Select a tax rate</option>
          {taxOptions.map(tax => (
            <option key={tax.tax_id} value={tax.tax_id}>
              {tax.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};