import React, { useState, useEffect } from 'react';

/**
 * Asset: assets/d34e1f92-5b5e-47c4-9b1a-7114f95e7201.svg
 * Asset: assets/a1293d32-8542-4911-a685-ba5a14660984.svg
 */

export const FranchisePurchaseOrderForm = () => {
  // Form State
  const [formData, setFormData] = useState({
    to_store_id: '',
    supplier_id: '',
    supplier_ref_code: '',
    due_at: '',
    notes: '',
    items: [] // Array of { product_id, order_qty }
  });

  const [errors, setErrors] = useState({});

  // Validation Logic
  const validate = () => {
    const newErrors = {};
    if (!formData.to_store_id) newErrors.to_store_id = "Deliver To is required.";
    if (!formData.supplier_id) newErrors.supplier_id = "From Supplier is required.";
    if (formData.items.length === 0) newErrors.items = "At least one Product is required.";
    
    const productIds = new Set();
    formData.items.forEach((item, index) => {
      if (item.order_qty <= 0) newErrors[`qty_${index}`] = "order_qty must be greater than 0.";
      if (productIds.has(item.product_id)) newErrors[`dup_${index}`] = "Duplicate Products are not allowed.";
      productIds.add(item.product_id);
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleSave = async () => {
    if (!validate()) return;

    const response = await fetch('/api/franchise-purchase-orders/external', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.status === 201) {
      // Handle success (e.g., redirect or show toast)
    } else {
      const data = await response.json();
      setErrors(data.errors);
    }
  };

  return (
    <div>
      <h1>Franchise Purchase Order Standard (external)</h1>
      
      {/* Header Fields */}
      <select value={formData.to_store_id} onChange={(e) => setFormData({...formData, to_store_id: e.target.value})}>
        {/* Options loaded from API */}
      </select>
      
      <select value={formData.supplier_id} onChange={(e) => setFormData({...formData, supplier_id: e.target.value})}>
        {/* Options loaded from API */}
      </select>

      <input type="text" placeholder="Reference Number" value={formData.supplier_ref_code} 
             onChange={(e) => setFormData({...formData, supplier_ref_code: e.target.value})} />

      <input type="date" value={formData.due_at} 
             onChange={(e) => setFormData({...formData, due_at: e.target.value})} />

      <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} />

      {/* Product Section */}
      {formData.items.map((item, index) => (
        <div key={index}>
          <select value={item.product_id} onChange={(e) => updateItem(index, 'product_id', e.target.value)}>
            {/* Product options */}
          </select>
          <input type="number" value={item.order_qty} onChange={(e) => updateItem(index, 'order_qty', e.target.value)} />
          {/* Read-only fields: store_qty, supply_price, order_amount */}
        </div>
      ))}

      <button onClick={handleSave}>Save</button>
      <button onClick={() => window.location.reload()}>Cancel</button>
    </div>
  );
};

// ORPHAN_FIELD: is_favorite (referenced by Star Button)
// ORPHAN_FIELD: discount (referenced by Add Discount Modal)