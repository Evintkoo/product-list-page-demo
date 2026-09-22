/**
 * Component: NewFlexibleVoucherPage
 * Asset: assets/77ea4e81-ed5e-4f9f-9faa-f985d7a0c8d6.svg
 * 
 * This page allows the creation of a new flexible voucher.
 * It initializes with empty fields and fetches necessary dropdown data.
 */

import React, { useState, useEffect } from 'react';

export const NewFlexibleVoucherPage = () => {
  // Form State
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    open_price: false,
    price_ex_tax: 0,
    value: 0,
    expire_in_months: null,
    expire_in_days: null,
    product_condition: 'Without product condition',
    sell_issue_locations: [],
    receive_redeem_locations: [],
    valid_for_member: false,
    valid_from: null,
    valid_until: null,
    external_publisher: ''
  });

  // Fetch initial data for dropdowns
  useEffect(() => {
    // GET /api/voucher_flexibles/new
    // Fetches options for Product Condition and External Publisher
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validation: Ensure required fields are present
    if (!formData.sku || !formData.name) {
      alert("SKU and Name are required.");
      return;
    }

    // POST /api/vouchers/flexible
    const response = await fetch('/api/vouchers/flexible', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      // Redirect to list page
    }
  };

  return (
    <div>
      <h1>New Voucher Flexible</h1>
      
      {/* SKU Field */}
      <input 
        value={formData.sku} 
        onChange={(e) => handleInputChange('sku', e.target.value)} 
        required 
      />

      {/* Name Field */}
      <input 
        value={formData.name} 
        onChange={(e) => handleInputChange('name', e.target.value)} 
        required 
      />

      {/* Description Field */}
      <textarea 
        value={formData.description} 
        onChange={(e) => handleInputChange('description', e.target.value)} 
      />

      {/* Open Price Field */}
      <input 
        type="checkbox" 
        checked={formData.open_price} 
        onChange={(e) => handleInputChange('open_price', e.target.checked)} 
      />

      {/* Price Ex Tax Field (Read-only) */}
      <input value={formData.price_ex_tax} readOnly />

      {/* Value Field (Read-only) */}
      <input value={formData.value} readOnly />

      {/* Expire in Months Field */}
      <input 
        type="number" 
        value={formData.expire_in_months || ''} 
        onChange={(e) => handleInputChange('expire_in_months', parseInt(e.target.value))} 
      />

      {/* Expire in Days Field */}
      <input 
        type="number" 
        value={formData.expire_in_days || ''} 
        onChange={(e) => handleInputChange('expire_in_days', parseInt(e.target.value))} 
      />

      {/* Product Condition Field */}
      <select 
        value={formData.product_condition} 
        onChange={(e) => handleInputChange('product_condition', e.target.value)}
      >
        <option value="Without product condition">Without product condition</option>
        <option value="By product list">By product list</option>
        <option value="By product type and brand">By product type and brand</option>
      </select>

      {/* Sell/Issue Locations Field */}
      <select multiple onChange={(e) => handleInputChange('sell_issue_locations', Array.from(e.target.selectedOptions, o => o.value))}>
        {/* Options populated from API */}
      </select>

      {/* Receive/Redeem Locations Field */}
      <select multiple onChange={(e) => handleInputChange('receive_redeem_locations', Array.from(e.target.selectedOptions, o => o.value))}>
        {/* Options populated from API */}
      </select>

      {/* Valid For Member Field */}
      <input 
        type="checkbox" 
        checked={formData.valid_for_member} 
        onChange={(e) => handleInputChange('valid_for_member', e.target.checked)} 
      />

      {/* Valid From Field */}
      <input 
        type="datetime-local" 
        onChange={(e) => handleInputChange('valid_from', e.target.value)} 
      />

      {/* Valid Until Field */}
      <input 
        type="datetime-local" 
        onChange={(e) => handleInputChange('valid_until', e.target.value)} 
      />

      {/* External Publisher Field */}
      <input 
        value={formData.external_publisher} 
        onChange={(e) => handleInputChange('external_publisher', e.target.value)} 
      />

      <button onClick={handleSubmit}>Save</button>
      <button onClick={() => window.location.href = '/vouchers'}>Cancel</button>
    </div>
  );
};