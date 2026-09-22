/**
 * Component: FranchisePurchaseOrderForm
 * Asset: assets/e62cc7c5-9dd0-4c92-a416-38e0cc6ae988.svg
 * 
 * This form collects data to create a new Franchise Purchase Order.
 * It manages local state for the fields and performs immediate validation.
 */

import React, { useState } from 'react';

export const FranchisePurchaseOrderForm = () => {
  // Form State
  const [formData, setFormData] = useState({
    from_warehouse_id: '',
    to_store_id: '',
    from_supplier_id: '',
    ref_code: '',
    due_at: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // Validation Logic
  const validate = (name, value) => {
    const newErrors = { ...errors };
    const requiredFields = ['from_warehouse_id', 'to_store_id', 'from_supplier_id'];
    
    if (requiredFields.includes(name) && !value) {
      newErrors[name] = 'This field is required';
    } else {
      delete newErrors[name];
    }
    setErrors(newErrors);
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = async () => {
    // Trigger final validation check
    const response = await fetch('/franchise-purchase-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const data = await response.json();
      setErrors(data.errors || { form: 'Submission failed' });
    }
  };

  return (
    <form>
      {/* Read-only System Field */}
      <input type="text" disabled placeholder="Auto-generated" aria-label="Document Number" />

      {/* Required Dropdowns */}
      <WarehouseDropdown 
        value={formData.from_warehouse_id} 
        onChange={(val) => handleChange('from_warehouse_id', val)} 
      />
      
      <StoreDropdown 
        value={formData.to_store_id} 
        onChange={(val) => handleChange('to_store_id', val)} 
      />
      
      <SupplierDropdown 
        value={formData.from_supplier_id} 
        onChange={(val) => handleChange('from_supplier_id', val)} 
      />

      {/* Optional Inputs */}
      <input 
        type="text" 
        value={formData.ref_code} 
        onChange={(e) => handleChange('ref_code', e.target.value)} 
      />
      
      <input 
        type="date" 
        value={formData.due_at} 
        onChange={(e) => handleChange('due_at', e.target.value)} 
      />
      
      <textarea 
        value={formData.notes} 
        onChange={(e) => handleChange('notes', e.target.value)} 
      />

      <button type="button" onClick={handleSubmit}>Create Order</button>
    </form>
  );
};