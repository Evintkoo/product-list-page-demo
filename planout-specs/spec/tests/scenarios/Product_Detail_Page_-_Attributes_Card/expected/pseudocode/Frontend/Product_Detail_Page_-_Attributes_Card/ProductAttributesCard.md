/**
 * Component: ProductAttributesCard
 * Description: Displays the custom attributes and classification metadata for a product.
 * Asset: assets/831b53ce-6512-435d-b914-721ae602823e.svg
 */

import React from 'react';

// The component receives product data as props. 
// Fields are derived from the product entity schema.
interface ProductAttributesCardProps {
  product: {
    unit_bisnis: string;      // Maps to "Unit Bisnis"
    kategori_item: string;    // Maps to "Kategori Item"
    tipe_mobil: string;       // Maps to "Tipe Mobil"
    attribute_4: string;      // Maps to "Attribute 4"
    attribute_5: string;      // Maps to "Attribute 5"
    attribute_6: string;      // Maps to "Attribute 6"
  };
}

export const ProductAttributesCard: React.FC<ProductAttributesCardProps> = ({ product }) => {
  
  return (
    <div className="attributes-card-container">
      <h3>Product Attributes</h3>
      
      <div className="attribute-row">
        <label>Unit Bisnis</label>
        <span>{product.unit_bisnis}</span>
      </div>

      <div className="attribute-row">
        <label>Kategori Item</label>
        <span>{product.kategori_item}</span>
      </div>

      <div className="attribute-row">
        <label>Tipe Mobil</label>
        <span>{product.tipe_mobil}</span>
      </div>

      <div className="attribute-row">
        <label>Attribute 4</label>
        <span>{product.attribute_4}</span>
      </div>

      <div className="attribute-row">
        <label>Attribute 5</label>
        <span>{product.attribute_5}</span>
      </div>

      <div className="attribute-row">
        <label>Attribute 6</label>
        <span>{product.attribute_6}</span>
      </div>
    </div>
  );
};

// Note: All fields are rendered as read-only display elements. 
// No validation logic is required as these are strictly presentation fields 
// populated from the product detail data source.