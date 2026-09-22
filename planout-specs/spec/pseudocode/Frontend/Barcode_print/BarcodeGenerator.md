import React, { useState } from 'react';
import { useBarcodeService } from './hooks/useBarcodeService';

/**
 * Component: BarcodeGenerator
 * Purpose: Provides an interface to select products and trigger barcode label generation.
 */
export const BarcodeGenerator = () => {
  const [selectedProductId, setSelectedProductId] = useState(''); // ORPHAN_FIELD: selectedProductId
  const [labelQuantity, setLabelQuantity] = useState(1); // ORPHAN_FIELD: labelQuantity
  const { generateBarcode, isLoading, error } = useBarcodeService();

  const handlePrint = async () => {
    // Validation triggered immediately on action
    if (!selectedProductId) return;
    if (labelQuantity < 1) return;

    await generateBarcode({
      product_id: selectedProductId, // ORPHAN_FIELD: product_id
      quantity: labelQuantity        // ORPHAN_FIELD: quantity
    });
  };

  return (
    <div className="barcode-container">
      <select 
        value={selectedProductId} 
        onChange={(e) => setSelectedProductId(e.target.value)}
      >
        {/* Product list mapping would go here */}
      </select>

      <input 
        type="number" 
        value={labelQuantity}
        min="1"
        onChange={(e) => setLabelQuantity(parseInt(e.target.value))}
      />

      <button onClick={handlePrint} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Print Barcode'}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};