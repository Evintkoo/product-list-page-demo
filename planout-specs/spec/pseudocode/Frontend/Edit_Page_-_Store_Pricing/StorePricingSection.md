import React, { useState, useEffect } from 'react';

/**
 * Component: StorePricingSection
 * Description: Frontend component for editing store pricing details.
 * Asset: assets/storepricing-editpage.svg
 */

export const StorePricingSection = ({ initialData }) => {
  // State management for form fields
  // Note: Field names are derived from expected API payload requirements
  const [price, setPrice] = useState(initialData?.price || 0);
  const [includingTax, setIncludingTax] = useState(initialData?.includingTax || false);
  const [errors, setErrors] = useState({});

  // Validation logic triggered immediately on change
  const validateField = (name, value) => {
    let errorMsg = "";
    if (name === "price") {
      if (value === null || value === undefined || value < 0) {
        errorMsg = "Price must be a valid positive number.";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handlePriceChange = (e) => {
    const val = parseFloat(e.target.value);
    setPrice(val);
    validateField("price", val);
  };

  const handleTaxToggle = (e) => {
    setIncludingTax(e.target.checked);
  };

  return (
    <div className="store-pricing-container">
      {/* Header Section */}
      <div className="header">
        <span className="icon-dollar">$</span>
        <h3 className="blue-label">STORE PRICING</h3>
      </div>

      {/* Price Input */}
      <div className="form-group">
        <label htmlFor="price">Price (IDR)</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={handlePriceChange}
          placeholder="0,0000"
          required
        />
        {errors.price && <span className="error-text">{errors.price}</span>}
      </div>

      {/* Tax Checkbox */}
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={includingTax}
            onChange={handleTaxToggle}
          />
          Including Tax
        </label>
      </div>
    </div>
  );
};