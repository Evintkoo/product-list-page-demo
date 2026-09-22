/**
 * Component: OrderWarehouseProductFormCard
 * Asset: assets/6296b186-ca58-425d-bfd8-e0f549a96d19.svg
 * 
 * Manages the creation of warehouse orders. 
 * Note: The form handles multiple product rows dynamically.
 */

import React, { useState } from 'react';

export const WarehouseOrderForm = () => {
  // State to manage multiple product rows
  const [rows, setRows] = useState([{ 
    id: crypto.randomUUID(), 
    warehouse_product_id: '', 
    quantity: 0, 
    company_average_cost: 0, 
    store_remark: '' 
  }]);

  // Validation logic triggered immediately on change
  const validateField = (name, value) => {
    if (name === 'quantity' && value <= 0) return "Quantity must be greater than 0";
    if (name === 'company_average_cost' && value < 0) return "Cost cannot be negative";
    if (name === 'store_remark' && value.trim() === '') return "Remark is required";
    return null;
  };

  const handleAddRow = () => {
    setRows([...rows, { 
      id: crypto.randomUUID(), 
      warehouse_product_id: '', 
      quantity: 0, 
      company_average_cost: 0, 
      store_remark: '' 
    }]);
  };

  const handleRemoveRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  return (
    <div className="order-warehouse-product-form-card">
      {rows.map((row, index) => (
        <div key={row.id} className="product-row">
          
          {/* Search Product Input */}
          {/* Maps to warehouse_product_id */}
          <SearchDropdown 
            placeholder="Search by SKU, Code, or Name"
            minLength={3}
            onSelect={(product) => {
              updateRow(row.id, 'warehouse_product_id', product.id);
              // ORPHAN_FIELD: store_qty (Logic requested setting this, but schema uses 'quantity')
            }}
          />

          {/* Order Quantity Input */}
          {/* Maps to quantity */}
          <input 
            type="number"
            name="quantity"
            onChange={(e) => updateRow(row.id, 'quantity', parseInt(e.target.value))}
          />

          {/* Average Cost Input */}
          {/* Maps to company_average_cost */}
          <input 
            type="number"
            name="company_average_cost"
            onChange={(e) => updateRow(row.id, 'company_average_cost', parseFloat(e.target.value))}
          />

          {/* Store Remark Input */}
          {/* Maps to store_remark */}
          <input 
            type="text"
            name="store_remark"
            onChange={(e) => updateRow(row.id, 'store_remark', e.target.value)}
          />

          {/* X Button */}
          <button onClick={() => handleRemoveRow(row.id)}>Remove</button>
        </div>
      ))}

      {/* Add Product Button */}
      <button onClick={handleAddRow}>Add Product</button>
    </div>
  );
};