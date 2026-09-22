/**
 * Component: DimensionsCard
 * Description: Displays physical dimensions (Volume and Weight) for the product detail page.
 * Asset: assets/2e218980-388e-472b-a255-1467d466cb06.svg
 */

import React from 'react';

// Props interface derived from product entity context
interface DimensionsCardProps {
  productData: {
    volume_ml: number; // ORPHAN_FIELD: volume_ml (Mapping to "Volume (Mililiter)")
    weight_g: number;  // ORPHAN_FIELD: weight_g (Mapping to "Weight (Gram)")
  };
}

export const DimensionsCard: React.FC<DimensionsCardProps> = ({ productData }) => {
  
  // Validation Logic:
  // Ensure data is present before rendering. 
  // If values are null/undefined, display "N/A" to maintain UI consistency.
  const formatValue = (value: number | undefined) => (value !== undefined ? value : 'N/A');

  return (
    <div className="dimensions-card-container">
      <h3>Product Dimensions</h3>
      
      <div className="dimension-row">
        <label>Volume (Mililiter)</label>
        <span className="read-only-value">
          {formatValue(productData.volume_ml)} ml
        </span>
      </div>

      <div className="dimension-row">
        <label>Weight (Gram)</label>
        <span className="read-only-value">
          {formatValue(productData.weight_g)} g
        </span>
      </div>
    </div>
  );
};