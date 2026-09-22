/**
 * Component: StockOpnameForm
 * Description: New Stock Opname Form Card for inventory management.
 * Asset: assets/3c20205f-37d0-4ed3-a74f-5b3fb1165724.svg
 */

import React, { useState } from 'react';

export const StockOpnameForm = () => {
  // Form State
  const [formData, setFormData] = useState({
    store_id: '',
    product_type_id: '',
    product_brand_id: '',
    opname_date: '',
  });

  // ORPHAN_FIELD: ref_code (Non-editable, autofilled)
  // ORPHAN_FIELD: notes (Required text area)

  const [errors, setErrors] = useState({});

  // Validation Logic
  const validate = () => {
    const newErrors = {};
    if (!formData.store_id) newErrors.store_id = "Store is required";
    if (!formData.product_type_id) newErrors.product_type_id = "Product Type is required";
    if (!formData.product_brand_id) newErrors.product_brand_id = "Product Brand is required";
    if (!formData.opname_date) newErrors.opname_date = "Completed Date is required";
    // ORPHAN_FIELD: notes validation
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAutofill = () => {
    if (!formData.store_id) {
      setErrors({ ...errors, store_id: "Please select a Store first to use Autofill" });
      return;
    }
    // Logic to trigger product list population
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const response = await fetch('/stock/opname/create', {
      method: 'POST',
      body: JSON.stringify({
        store_id: formData.store_id,
        product_type_id: formData.product_type_id,
        product_brand_id: formData.product_brand_id,
        opname_date: formData.opname_date,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.error_message);
    }
  };

  return (
    <form>
      {/* Store Input */}
      <select 
        value={formData.store_id} 
        onChange={(e) => setFormData({...formData, store_id: e.target.value})}
      >
        {/* Options from Store table */}
      </select>
      {errors.store_id && <span>{errors.store_id}</span>}

      {/* Ref Code (Non-editable) */}
      <input type="text" disabled placeholder="Autofilled upon creation" />

      {/* Product Type Input */}
      <select 
        value={formData.product_type_id} 
        onChange={(e) => setFormData({...formData, product_type_id: e.target.value})}
      >
        {/* Options from product types table */}
      </select>

      {/* Product Brand Input */}
      <select 
        value={formData.product_brand_id} 
        onChange={(e) => setFormData({...formData, product_brand_id: e.target.value})}
      >
        {/* Options from product brands table */}
      </select>

      {/* Completed Date Input */}
      <input 
        type="date" 
        onChange={(e) => setFormData({...formData, opname_date: e.target.value})} 
      />

      {/* Notes (Orphan) */}
      <textarea placeholder="Enter notes here" />

      {/* Action Buttons */}
      <button type="button" onClick={handleAutofill}>Autofill</button>
      <button type="button" onClick={() => openModal('AutofillModal')}>Advanced</button>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
};