/**
 * Component: StockOpnameProductForm
 * Description: Manages the dynamic list of products for stock opname.
 * Asset: assets/e262cbd0-c560-4ec2-be99-4fc9f2e56db7.svg
 */

import React, { useState } from 'react';

interface StockOpnameItem {
  id: string; // Internal row identifier
  product_id: string;
  counted_qty: number | '';
}

export const StockOpnameProductForm = () => {
  const [items, setItems] = useState<StockOpnameItem[]>([
    { id: '1', product_id: '', counted_qty: '' }
  ]);

  // Validation Logic
  const validateQty = (value: number | string) => {
    if (value === '') return true; // Allow empty during typing
    return Number(value) >= 0;
  };

  const handleAddRow = () => {
    setItems([...items, { id: Date.now().toString(), product_id: '', counted_qty: '' }]);
  };

  const handleRemoveRow = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof StockOpnameItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async () => {
    for (const item of items) {
      // API Payload mapping
      const payload = {
        product_id: item.product_id,
        counted_qty: Number(item.counted_qty)
      };

      await fetch('/stock-opname/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
  };

  return (
    <div>
      <h3>Products</h3>
      
      {/* Upload and Print Actions */}
      <button onClick={() => {/* Open Upload Dropdown */}}>Upload Manager</button>
      <button onClick={() => {/* Open Print Dropdown */}}>Print Blank Form</button>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Product</th>
            <th>Counted Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <input 
                  type="text" 
                  placeholder="Input Product SKU, Code, or Name"
                  value={item.product_id}
                  onChange={(e) => updateItem(item.id, 'product_id', e.target.value)}
                />
              </td>
              <td>
                <input 
                  type="number"
                  value={item.counted_qty}
                  onChange={(e) => updateItem(item.id, 'counted_qty', e.target.value)}
                  style={{ borderColor: !validateQty(item.counted_qty) ? 'red' : 'initial' }}
                />
                {!validateQty(item.counted_qty) && <span>Invalid quantity</span>}
              </td>
              <td>
                <button onClick={() => handleRemoveRow(item.id)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddRow}>Add Product</button>
    </div>
  );
};