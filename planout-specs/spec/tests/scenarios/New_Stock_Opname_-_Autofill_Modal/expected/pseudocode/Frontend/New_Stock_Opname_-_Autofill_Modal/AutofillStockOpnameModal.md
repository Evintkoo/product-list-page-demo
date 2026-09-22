/**
 * Component: AutofillStockOpnameModal
 * Asset: assets/82908ca7-f8aa-4559-87ab-99bd0bbc6358.svg
 * 
 * This modal allows users to filter and autofill product details into the 
 * New Stock Opname form based on specific criteria.
 */

import React, { useState } from 'react';

export const AutofillStockOpnameModal = ({ onClose, onSave }) => {
  // State management for form fields
  const [formData, setFormData] = useState({
    product_type_id: null,
    product_brand_id: null,
    supplier_id: null,
    product_info_field: 'Kategori Item', // Default value
    product_info_value: '',
    sort_by: 'SKU',
    include_zero_stock: false,
    movement_days: 0
  });

  // Validation logic: Ensure movement_days is a non-negative integer
  const validateMovementDays = (value) => {
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Logic: If Product Info changes, clear or update Start With (product_info_value)
    if (field === 'product_info_field') {
      setFormData(prev => ({ ...prev, product_info_value: '' }));
    }
  };

  const handleSave = async () => {
    if (!validateMovementDays(formData.movement_days)) {
      alert("Please enter a valid number of days.");
      return;
    }

    // API Call: POST /stock-opname/autofill
    try {
      const response = await fetch('/stock-opname/autofill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        onSave(data); // Pass products back to parent
        onClose();    // Redirect/Close
      }
    } catch (error) {
      console.error("Failed to autofill products", error);
    }
  };

  return (
    <div className="modal">
      <h2>Autofill</h2>
      
      {/* Dropdowns for filtering */}
      <select onChange={(e) => handleInputChange('product_type_id', e.target.value)}>
        {/* Options populated from product types table */}
      </select>

      <select onChange={(e) => handleInputChange('product_brand_id', e.target.value)}>
        {/* Options populated from product brands table */}
      </select>

      <select onChange={(e) => handleInputChange('supplier_id', e.target.value)}>
        {/* Options populated from suppliers table */}
      </select>

      {/* Product Info & Start With */}
      <select 
        value={formData.product_info_field}
        onChange={(e) => handleInputChange('product_info_field', e.target.value)}
      >
        <option value="Kategori Item">Kategori Item</option>
        <option value="Unit Bisnis">Unit Bisnis</option>
        <option value="Tipe Mobil">Tipe Mobil</option>
      </select>

      <input 
        type="text" 
        value={formData.product_info_value}
        onChange={(e) => handleInputChange('product_info_value', e.target.value)}
        placeholder="Start With"
      />

      {/* Sorting */}
      <select onChange={(e) => handleInputChange('sort_by', e.target.value)}>
        <option value="SKU">SKU</option>
        <option value="Name">Name</option>
      </select>

      {/* Zero Stock Toggle */}
      <div>
        <label>Show Zero Stock</label>
        <input type="radio" name="zero_stock" value="true" onChange={() => handleInputChange('include_zero_stock', true)} /> Yes
        <input type="radio" name="zero_stock" value="false" onChange={() => handleInputChange('include_zero_stock', false)} /> No
      </div>

      {/* Movement Days */}
      <input 
        type="number" 
        value={formData.movement_days}
        onChange={(e) => handleInputChange('movement_days', e.target.value)}
      />

      {/* Actions */}
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};