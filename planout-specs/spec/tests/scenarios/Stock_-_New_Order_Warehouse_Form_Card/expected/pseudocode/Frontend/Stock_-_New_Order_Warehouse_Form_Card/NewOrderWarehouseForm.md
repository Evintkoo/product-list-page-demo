/**
 * Component: NewOrderWarehouseForm
 * Description: A form card for creating a new stock order.
 * Asset: assets/5ec48956-a1bc-42be-b7fe-015c373f7a9e.svg
 */

import React, { useState } from 'react';

export const NewOrderWarehouseForm = () => {
  // Form State Initialization
  const [formData, setFormData] = useState({
    from_warehouse_id: '', // Maps to Warehouse.id
    to_store_id: '',       // ORPHAN_FIELD: to_store_id
    ref_code: '',          // ORPHAN_FIELD: ref_code
    due_at: '',            // ORPHAN_FIELD: due_at
    workflow_state: 'draft', // Maps to StockOrder.status
    notes: ''              // ORPHAN_FIELD: notes
  });

  const [errors, setErrors] = useState({});

  // Validation Logic
  const validate = (name, value) => {
    let error = '';
    if (['from_warehouse_id', 'to_store_id', 'ref_code', 'due_at'].includes(name)) {
      if (!value) error = 'This field is required.';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = async () => {
    // Trigger final validation check
    const payload = {
      warehouse_id: formData.from_warehouse_id,
      from_warehouse_id: formData.from_warehouse_id,
      to_store_id: formData.to_store_id,
      ref_code: formData.ref_code,
      due_at: formData.due_at,
      workflow_state: formData.workflow_state,
      status: formData.workflow_state,
      order_type: 'transfer', // Defaulting based on context
      notes: formData.notes
    };

    const response = await fetch('/stock-orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      // Handle success
    }
  };

  return (
    <form>
      {/* From Warehouse Dropdown */}
      <select name="from_warehouse_id" onChange={handleChange} required>
        {/* Options populated from Warehouse entity */}
      </select>
      {errors.from_warehouse_id && <span>{errors.from_warehouse_id}</span>}

      {/* Deliver To Dropdown */}
      <select name="to_store_id" onChange={handleChange} required>
        {/* Options populated from Store entity */}
      </select>
      {errors.to_store_id && <span>{errors.to_store_id}</span>}

      {/* Reference Number Input */}
      <input type="text" name="ref_code" onChange={handleChange} required />
      {errors.ref_code && <span>{errors.ref_code}</span>}

      {/* Due At Input */}
      <input type="date" name="due_at" onChange={handleChange} required />
      {errors.due_at && <span>{errors.due_at}</span>}

      {/* Workflow State */}
      <select name="workflow_state" value={formData.workflow_state} onChange={handleChange}>
        <option value="draft">Draft</option>
        <option value="confirmed">Confirmed</option>
        {/* ... other enum values */}
      </select>

      {/* Notes Textarea */}
      <textarea name="notes" onChange={handleChange} />

      <button type="button" onClick={handleSubmit}>Create Order</button>
    </form>
  );
};