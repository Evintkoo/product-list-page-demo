/**
 * Component: ServiceSettingsCard
 * Description: A settings card component for the Add Service Product page, 
 * managing operational attributes of the service.
 * Asset: assets/3889b7e0-d504-4b39-8cac-0dd7c8bdc687.svg
 */

import React, { useState } from 'react';

export const ServiceSettingsCard = () => {
  // State management for form fields
  // Note: Field names are derived from expected API payload requirements
  const [settings, setSettings] = useState({
    is_open_price: false,           // ORPHAN_FIELD: is_open_price
    is_active: true,                // ORPHAN_FIELD: is_active
    estimated_time: '',             // ORPHAN_FIELD: estimated_time
    is_open_estimated_time: false   // ORPHAN_FIELD: is_open_estimated_time
  });

  const [errors, setErrors] = useState({});

  // Validation Logic
  const validateField = (name, value) => {
    let error = '';
    if (name === 'estimated_time') {
      // Validation: Ensure duration is a positive integer if provided
      if (value !== '' && (!/^\d+$/.test(value) || parseInt(value) < 0)) {
        error = 'Estimated Time must be a positive number.';
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setSettings(prev => ({ ...prev, [name]: val }));
    validateField(name, val);
  };

  return (
    <div className="settings-card">
      <h3>Service Settings</h3>

      {/* Active Checkbox */}
      <label>
        <input 
          type="checkbox" 
          name="is_active" 
          checked={settings.is_active} 
          onChange={handleChange} 
        />
        Active
      </label>

      {/* Open Price Checkbox */}
      <label>
        <input 
          type="checkbox" 
          name="is_open_price" 
          checked={settings.is_open_price} 
          onChange={handleChange} 
        />
        Open Price
      </label>

      {/* Estimated Time Input */}
      <div className="field-group">
        <label htmlFor="estimated_time">
          Estimated Time 
          <span title="Help: Enter the service duration in minutes"> (?)</span>
        </label>
        <input 
          id="estimated_time"
          name="estimated_time"
          type="text"
          placeholder="e.g. 30"
          value={settings.estimated_time}
          onChange={handleChange}
        />
        {errors.estimated_time && <span className="error">{errors.estimated_time}</span>}
      </div>

      {/* Open Estimated Time Checkbox */}
      <label>
        <input 
          type="checkbox" 
          name="is_open_estimated_time" 
          checked={settings.is_open_estimated_time} 
          onChange={handleChange} 
        />
        Open Estimated Time
      </label>
    </div>
  );
};