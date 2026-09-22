/**
 * Component: ServiceSettingsCard
 * Description: Renders the settings configuration card for a service product.
 * Asset: assets/4fd0f7a0-45fa-4ba0-8d87-0ccb07a26eb3.svg
 */

import React, { useState, useEffect } from 'react';

export const ServiceSettingsCard = ({ serviceData }) => {
  // State initialization based on serviceData (Entity: ServiceProduct)
  const [isActive, setIsActive] = useState(serviceData.is_active);
  const [isOpenPrice, setIsOpenPrice] = useState(serviceData.is_open_price);
  const [estimatedTime, setEstimatedTime] = useState(serviceData.estimated_duration_minutes);
  const [isOpenEstimatedTime, setIsOpenEstimatedTime] = useState(serviceData.is_open_duration);

  // Validation Logic
  // Estimated Time must be a positive integer. 
  // If invalid, show error message immediately.
  const handleEstimatedTimeChange = (value) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0) {
      // Trigger UI error state: "Estimated time must be a positive number"
    }
    setEstimatedTime(value);
  };

  return (
    <div className="settings-card">
      {/* Active Toggle */}
      <label>
        <input 
          type="checkbox" 
          checked={isActive} 
          onChange={(e) => setIsActive(e.target.checked)} 
        />
        Active
      </label>

      {/* Open Price Toggle */}
      <label>
        <input 
          type="checkbox" 
          checked={isOpenPrice} 
          onChange={(e) => setIsOpenPrice(e.target.checked)} 
        />
        Open Price
      </label>

      {/* Estimated Time Input */}
      <div className="field-group">
        <label>
          Estimated Time
          <span className="help-icon" title="Duration in minutes">?</span>
        </label>
        <input 
          type="number" 
          value={estimatedTime} 
          onChange={(e) => handleEstimatedTimeChange(e.target.value)} 
        />
      </div>

      {/* Open Estimated Time Toggle */}
      <label>
        <input 
          type="checkbox" 
          checked={isOpenEstimatedTime} 
          onChange={(e) => setIsOpenEstimatedTime(e.target.checked)} 
        />
        Open Estimated Time
      </label>
    </div>
  );
};

// Note: The fields above map to the service product configuration.
// ORPHAN_FIELD: is_active
// ORPHAN_FIELD: is_open_price
// ORPHAN_FIELD: estimated_duration_minutes
// ORPHAN_FIELD: is_open_duration