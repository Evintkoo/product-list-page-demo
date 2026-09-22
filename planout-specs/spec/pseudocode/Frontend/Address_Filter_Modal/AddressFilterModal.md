/**
 * Component: AddressFilterModal
 * Description: Popup for address filter in customer page.
 * Asset: assets/c3d11ba5-d343-45c3-ae74-f89ef6629b8e.svg
 */

import React, { useState } from 'react';

export const AddressFilterModal = ({ onClose, onApply }) => {
  // State management for filter fields
  // Note: Fields are initialized as empty strings.
  const [filters, setFilters] = useState({
    country: '',        // ORPHAN_FIELD: country
    province: '',       // ORPHAN_FIELD: province
    regency: '',        // ORPHAN_FIELD: regency
    district: '',       // ORPHAN_FIELD: district
    village: '',        // ORPHAN_FIELD: village
    postal_code: '',    // ORPHAN_FIELD: postal_code
    address: ''         // ORPHAN_FIELD: address
  });

  // Validation Logic
  // Immediate validation: Postal Code must be numeric if provided.
  const validatePostalCode = (value) => {
    const isNumeric = /^\d*$/.test(value);
    return isNumeric;
  };

  const handleInputChange = (field, value) => {
    if (field === 'postal_code' && !validatePostalCode(value)) {
      return; // Prevent non-numeric input for postal code
    }
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleClearAll = () => {
    setFilters({
      country: '',
      province: '',
      regency: '',
      district: '',
      village: '',
      postal_code: '',
      address: ''
    });
  };

  return (
    <div className="modal-container">
      {/* Country Dropdown */}
      <select 
        value={filters.country} 
        onChange={(e) => handleInputChange('country', e.target.value)}
      >
        <option value="">Select Country</option>
        {/* Options populated from system metadata */}
      </select>

      {/* Text Inputs */}
      <input 
        placeholder="Province" 
        value={filters.province} 
        onChange={(e) => handleInputChange('province', e.target.value)} 
      />
      <input 
        placeholder="Regency/Municipality" 
        value={filters.regency} 
        onChange={(e) => handleInputChange('regency', e.target.value)} 
      />
      <input 
        placeholder="District" 
        value={filters.district} 
        onChange={(e) => handleInputChange('district', e.target.value)} 
      />
      <input 
        placeholder="Village" 
        value={filters.village} 
        onChange={(e) => handleInputChange('village', e.target.value)} 
      />
      <input 
        placeholder="Postal Code" 
        value={filters.postal_code} 
        onChange={(e) => handleInputChange('postal_code', e.target.value)} 
      />
      <textarea 
        placeholder="Address" 
        value={filters.address} 
        onChange={(e) => handleInputChange('address', e.target.value)} 
      />

      {/* Action Buttons */}
      <button onClick={handleClearAll}>Clear All</button>
      <button onClick={onClose}>Close</button>
      <button onClick={() => onApply(filters)}>Apply</button>
    </div>
  );
};