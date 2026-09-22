/**
 * Component: StockReturnForm
 * Asset: assets/9d4c7aca-03ba-4efd-bdd3-4ffebbbfc9ab.svg
 * 
 * This component handles the creation of a new stock return.
 * It manages state for form inputs and performs immediate validation.
 */

import React, { useState } from 'react';

export const StockReturnForm = () => {
  // Form State
  const [formData, setFormData] = useState({
    from_store_id: '',
    to_warehouse_id: '',
    to_internal_supplier_id: '',
    ref_code: '',
    notes: ''
  });

  // Validation State
  const [errors, setErrors] = useState({});

  // Handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };
    
    // Required fields validation
    if (['from_store_id', 'to_warehouse_id', 'to_internal_supplier_id'].includes(field)) {
      if (!value) {
        newErrors[field] = 'This field is required';
      } else {
        delete newErrors[field];
      }
    }
    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    // Final validation check before submission
    const response = await fetch('/stock-returns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const data = await response.json();
      // Handle success (e.g., redirect or show toast with data.id)
    }
  };

  return (
    <form>
      {/* Read-only Document Number */}
      <div className="field">
        <label>Document No</label>
        <input type="text" disabled placeholder="Auto-generated" />
      </div>

      {/* Return From (Store) */}
      <div className="field">
        <label>Return From</label>
        <SearchableDropdown 
          endpoint="/stores" 
          onChange={(val) => handleInputChange('from_store_id', val)}
          error={errors.from_store_id}
        />
      </div>

      {/* To Warehouse */}
      <div className="field">
        <label>To Warehouse</label>
        <Dropdown 
          endpoint="/warehouses" 
          onChange={(val) => handleInputChange('to_warehouse_id', val)}
          error={errors.to_warehouse_id}
        />
      </div>

      {/* Return To Internal Supplier */}
      <div className="field">
        <label>Return To Internal Supplier</label>
        <Dropdown 
          endpoint="/suppliers?is_internal=true" 
          onChange={(val) => handleInputChange('to_internal_supplier_id', val)}
          error={errors.to_internal_supplier_id}
        />
      </div>

      {/* Reference Number */}
      <div className="field">
        <label>Reference Number</label>
        <input 
          type="text" 
          onChange={(e) => handleInputChange('ref_code', e.target.value)} 
        />
      </div>

      {/* Notes */}
      <div className="field">
        <label>Notes</label>
        <textarea 
          onChange={(e) => handleInputChange('notes', e.target.value)} 
        />
      </div>

      <button type="button" onClick={handleSubmit}>Submit Return</button>
    </form>
  );
};