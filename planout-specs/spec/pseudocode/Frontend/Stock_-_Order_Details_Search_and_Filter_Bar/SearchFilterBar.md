/**
 * Component: SearchFilterBar
 * Description: A toolbar for filtering inventory stock by SKU and Product Name.
 * Asset: assets/9d7b3356-17b4-448c-96d8-b2a0b531f355.svg
 */

import React, { useState } from 'react';

export const SearchFilterBar = () => {
  // State management for filter inputs
  // Note: Fields are derived from expected API request parameters
  const [skuValue, setSkuValue] = useState(''); // ORPHAN_FIELD: skuValue
  const [productName, setProductName] = useState(''); // ORPHAN_FIELD: productName

  /**
   * Validation Logic:
   * - SKU: Must be alphanumeric, max 20 characters.
   * - Product Name: Must not contain special characters, max 100 characters.
   * Validation triggers on change (immediate feedback).
   */
  const validateInput = (name: string, value: string) => {
    if (name === 'skuValue') {
      const isValid = /^[a-zA-Z0-9]*$/.test(value) && value.length <= 20;
      return isValid;
    }
    if (name === 'productName') {
      const isValid = /^[^!@#$%^&*()]*$/.test(value) && value.length <= 100;
      return isValid;
    }
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (validateInput(name, value)) {
      if (name === 'skuValue') setSkuValue(value);
      if (name === 'productName') setProductName(value);
    }
  };

  const handleSearch = () => {
    // Logic to trigger API call with current state
    // Payload: { skuValue, productName }
    console.log("Submitting search with:", { skuValue, productName });
  };

  return (
    <div className="search-filter-bar-container">
      {/* SKU Search Field */}
      <input
        type="text"
        name="skuValue"
        placeholder="Enter SKU"
        value={skuValue}
        onChange={handleInputChange}
      />

      {/* Product Name Field */}
      <input
        type="text"
        name="productName"
        placeholder="Enter Product Name"
        value={productName}
        onChange={handleInputChange}
      />

      {/* Search Button */}
      <button onClick={handleSearch} aria-label="Search">
        <img src="magnifying-glass-icon.svg" alt="Search" />
      </button>

      {/* Export Dropdown */}
      <div className="export-dropdown">
        <button>Export</button>
        {/* Export options menu logic would be triggered here */}
      </div>
    </div>
  );
};