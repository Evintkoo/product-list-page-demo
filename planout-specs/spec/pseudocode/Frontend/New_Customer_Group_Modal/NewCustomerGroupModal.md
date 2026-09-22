/**
 * Component: NewCustomerGroupModal
 * Purpose: Provides a form to define a new customer group within the Lumi ERP.
 * Asset: assets/078a0f28-5db6-43bd-979d-b7beada25c7e.svg
 */

import React, { useState } from 'react';
import { useCustomerGroupMutation } from './hooks/useCustomerGroupMutation'; // Derived from Logic swimlane

export const NewCustomerGroupModal = ({ onClose }) => {
  // State management for form fields
  // Note: Fields are derived from API PAYLOADS (none provided in context, 
  // so we define the expected schema based on feature requirements)
  const [formData, setFormData] = useState({
    group_name: '' // ORPHAN_FIELD: group_name
  });

  const [errors, setErrors] = useState({});
  const { mutate: saveCustomerGroup, isLoading } = useCustomerGroupMutation();

  // Validation logic triggered immediately on change
  const validate = (name, value) => {
    let error = '';
    if (name === 'group_name' && !value.trim()) {
      error = 'Customer group name is required.';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSave = async () => {
    if (!formData.group_name.trim()) {
      setErrors({ group_name: 'Customer group name is required.' });
      return;
    }

    try {
      // API call derived from Logic swimlane/contracts
      await saveCustomerGroup(formData);
      onClose(); // Close modal on success
    } catch (err) {
      console.error("Failed to save customer group", err);
    }
  };

  return (
    <div className="modal-container">
      {/* Header */}
      <header>
        <h1>New Customer Group</h1>
        <button onClick={onClose} aria-label="Close">X</button>
      </header>

      {/* Body */}
      <main>
        <label htmlFor="group_name">Customer Group Name</label>
        <input
          id="group_name"
          name="group_name"
          type="text"
          value={formData.group_name}
          onChange={handleChange}
          required
        />
        {errors.group_name && <span className="error">{errors.group_name}</span>}
      </main>

      {/* Footer */}
      <footer>
        <button onClick={onClose}>Cancel</button>
        <button 
          onClick={handleSave} 
          disabled={isLoading || !!errors.group_name || !formData.group_name}
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </footer>
    </div>
  );
};