/**
 * Component: ProductDetailsCard
 * Description: Displays core identity fields for a product in the detail page.
 * All fields are read-only as per requirements.
 * Asset: assets/2d33659b-345e-49ce-b3da-996abd11507e.svg
 */

import React from 'react';
import { CopyToClipboardButton } from './components/CopyToClipboardButton'; // Helper component

export const ProductDetailsCard = ({ productData }) => {
  // Data mapping from productData entity
  // Note: Fields are read-only, no state management for inputs required.
  
  return (
    <div className="product-details-card">
      {/* Header Section */}
      <div className="card-header">
        <h2 className="product-name">{productData.Name}</h2>
      </div>

      {/* Identity Fields Grid */}
      <div className="details-grid">
        
        <div className="field-group">
          <label>Type</label>
          <span>{productData.Type_Code} - {productData.Type_Name}</span>
        </div>

        <div className="field-group">
          <label>Brand</label>
          <span>{productData.Brand_Code} - {productData.Brand_Name}</span>
        </div>

        <div className="field-group">
          <label>SKU</label>
          <div className="sku-container">
            <span>{productData.SKU}</span>
            <CopyToClipboardButton textToCopy={productData.SKU} />
          </div>
        </div>

        <div className="field-group">
          <label>Product Code</label>
          <span>{productData.Product_Code}</span>
        </div>

        <div className="field-group">
          <label>Supplier Product Code</label>
          <span>{productData.Supplier_Product_Code}</span>
        </div>

        <div className="field-group">
          <label>Suppliers</label>
          <span>{productData.Suppliers || 'All Suppliers'}</span>
        </div>

        <div className="field-group full-width">
          <label>Description</label>
          <p className="description-text">{productData.Description}</p>
        </div>

        <div className="field-group full-width">
          <label>Tags</label>
          <div className="tags-container">
            {productData.Tags && productData.Tags.length > 0 ? (
              productData.Tags.map((tag) => <span key={tag} className="tag-pill">{tag}</span>)
            ) : (
              <span className="empty-state"></span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// ORPHAN_FIELD: Type_Code
// ORPHAN_FIELD: Type_Name
// ORPHAN_FIELD: Brand_Code
// ORPHAN_FIELD: Brand_Name
// ORPHAN_FIELD: SKU
// ORPHAN_FIELD: Name
// ORPHAN_FIELD: Description
// ORPHAN_FIELD: Tags
// ORPHAN_FIELD: Product_Code
// ORPHAN_FIELD: Supplier_Product_Code
// ORPHAN_FIELD: Suppliers