import React, { useState } from 'react';

/**
 * Component: StorePricingCard
 * Description: Frontend component for the Store pricing section in the add service product page.
 * Asset: assets/fa14b0bf-bae8-4209-aa71-e28652ac3c7e.svg
 */

export const StorePricingCard = () => {
  // State management for form fields
  // Note: Field names derived from expected API payload requirements
  const [price, setPrice] = useState<number | string>('');
  const [isTaxIncluded, setIsTaxIncluded] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ price?: string }>({});

  // Validation logic triggered immediately on change
  const validatePrice = (value: string | number) => {
    const numValue = Number(value);
    if (value === '' || isNaN(numValue) || numValue < 0) {
      setErrors({ price: 'Price (IDR) is required and must be a valid positive number.' });
    } else {
      setErrors({});
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(value);
    validatePrice(value);
  };

  return (
    <div className="store-pricing-container">
      {/* Subtitle Section */}
      <div className="pricing-header">
        <span className="blue-label">$ STORE PRICING</span>
      </div>

      {/* Price (IDR) Input */}
      <div className="form-group">
        <label htmlFor="price">Price (IDR)</label>
        <input
          id="price"
          type="number"
          placeholder="0,0000"
          value={price}
          onChange={handlePriceChange}
          required
        />
        {errors.price && <span className="error-text">{errors.price}</span>}
        <!-- ORPHAN_FIELD: price -->
      </div>

      {/* Including Tax Checkbox */}
      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={isTaxIncluded}
            onChange={(e) => setIsTaxIncluded(e.target.checked)}
          />
          Including Tax
        </label>
        <!-- ORPHAN_FIELD: isTaxIncluded -->
      </div>
    </div>
  );
};