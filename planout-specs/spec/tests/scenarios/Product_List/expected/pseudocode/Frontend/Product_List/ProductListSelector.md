/**
 * Component: ProductListSelector
 * Description: Handles the selection of products for voucher application, 
 * including bulk upload capabilities and sample file retrieval.
 * Asset: assets/4d68e8f2-4c42-4a4e-a05d-27bc83350c98.svg
 */

import { useProductListState } from './useProductListState';

export const ProductListSelector = () => {
  const { 
    selectedProducts, 
    handleFileChange, 
    downloadSampleFile, 
    isUploading 
  } = useProductListState();

  return (
    <div className="product-list-container">
      {/* Bulk Upload Section */}
      <div className="bulk-upload-controls">
        <button 
          onClick={() => document.getElementById('fileInput')?.click()}
          disabled={isUploading}
        >
          Upload Products
        </button>
        <input 
          id="fileInput"
          type="file" 
          accept=".csv, .xlsx" 
          onChange={handleFileChange} 
          style={{ display: 'none' }}
        />
        
        <a href="#" onClick={downloadSampleFile}>
          Download Example File
        </a>
      </div>

      {/* Product Selection Field */}
      <div className="product-selection-field">
        <label htmlFor="product_id">Product</label>
        {/* 
           ORPHAN_FIELD: product_id 
           Note: This field represents the selection mechanism for individual products 
           when "By Product List" is active.
        */}
        <select 
          id="product_id" 
          multiple 
          value={selectedProducts}
        >
          {/* Options populated via data schema entities */}
        </select>
      </div>
    </div>
  );
};