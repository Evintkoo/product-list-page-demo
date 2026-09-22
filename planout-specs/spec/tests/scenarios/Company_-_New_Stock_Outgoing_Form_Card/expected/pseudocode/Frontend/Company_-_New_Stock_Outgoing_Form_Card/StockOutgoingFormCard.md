/**
 * Component: StockOutgoingFormCard
 * Asset: assets/965edf62-d961-4439-8ad8-9a1d02fa30a2.svg
 * 
 * This component manages the header information for a new stock outgoing document.
 * It maintains local state for form fields and enforces validation rules.
 */

import React, { useState, useEffect } from 'react';

export const StockOutgoingFormCard = () => {
  // Form State
  const [formData, setFormData] = useState({
    source_id: '',
    source_type: '', // Derived from source selection
    due_at: '',
    supplier_ref_code: '',
    service_work_order_ids: [],
    notes: ''
  });

  const [errors, setErrors] = useState({});

  // Validation Logic
  const validate = (field, value) => {
    let newErrors = { ...errors };
    
    if (field === 'source_id' && !value) {
      newErrors.source_id = 'Source location is required.';
    } else {
      delete newErrors.source_id;
    }
    
    setErrors(newErrors);
  };

  // Handlers
  const handleSourceChange = (selectedOption) => {
    // selectedOption contains { id, type }
    const updatedData = { 
      ...formData, 
      source_id: selectedOption.id, 
      source_type: selectedOption.type 
    };
    setFormData(updatedData);
    validate('source_id', selectedOption.id);
  };

  const handleWorkOrderSearch = (query) => {
    if (query.length < 3) return;
    if (!formData.source_id) return; // Cannot search without location
    
    // API Call: GET /work-orders?location_id={formData.source_id}&q={query}
    // ORPHAN_FIELD: location_id
    // ORPHAN_FIELD: q
  };

  return (
    <form>
      {/* Read-only Document Number */}
      <input 
        type="text" 
        disabled 
        placeholder="Auto-generated" 
        aria-label="Document Number" 
      />

      {/* Required Source Field */}
      <select 
        required 
        onChange={(e) => handleSourceChange(JSON.parse(e.target.value))}
      >
        {/* Options populated from /locations endpoint */}
      </select>
      {errors.source_id && <span>{errors.source_id}</span>}

      {/* Due Date */}
      <input 
        type="date" 
        value={formData.due_at}
        onChange={(e) => setFormData({...formData, due_at: e.target.value})}
      />

      {/* Reference Number */}
      <input 
        type="text" 
        value={formData.supplier_ref_code}
        onChange={(e) => setFormData({...formData, supplier_ref_code: e.target.value})}
      />

      {/* Service Work Orders Picker */}
      <MultiSelectPicker 
        disabled={!formData.source_id}
        onSearch={handleWorkOrderSearch}
        onChange={(ids) => setFormData({...formData, service_work_order_ids: ids})}
      />

      {/* Notes */}
      <textarea 
        value={formData.notes}
        onChange={(e) => setFormData({...formData, notes: e.target.value})}
      />
    </form>
  );
};