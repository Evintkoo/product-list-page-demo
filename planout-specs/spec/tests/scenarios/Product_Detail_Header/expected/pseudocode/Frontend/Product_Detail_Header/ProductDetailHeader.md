/**
 * Component: ProductDetailHeader
 * Description: The top section of the product details page, displaying core product 
 * information and providing action buttons for management.
 * Asset: assets/b7476f7b-ba53-464e-bb62-6cb7c6b6565a.svg
 */

import React from 'react';

// The component expects a product object derived from the Product entity
// Fields: name, SKU, pricing (from Product node)
interface ProductDetailHeaderProps {
  product: {
    name: string;
    SKU: string;
    price: number; // <!-- ORPHAN_FIELD: price -->
  };
  onEdit: () => void;
  onDelete: () => void;
}

export const ProductDetailHeader: React.FC<ProductDetailHeaderProps> = ({ product, onEdit, onDelete }) => {
  
  return (
    <header className="product-detail-header">
      <div className="product-info">
        <h1>{product.name}</h1>
        <div className="meta-data">
          <span className="sku-label">SKU: {product.SKU}</span>
          <span className="price-label">Price: {product.price}</span> <!-- ORPHAN_FIELD: price -->
        </div>
      </div>

      <div className="action-buttons">
        <button 
          type="button" 
          className="btn-edit" 
          onClick={onEdit}
          aria-label="Edit Product Details"
        >
          Edit
        </button>
        
        <button 
          type="button" 
          className="btn-delete" 
          onClick={onDelete}
          aria-label="Delete Product"
        >
          Delete
        </button>
      </div>
    </header>
  );
};