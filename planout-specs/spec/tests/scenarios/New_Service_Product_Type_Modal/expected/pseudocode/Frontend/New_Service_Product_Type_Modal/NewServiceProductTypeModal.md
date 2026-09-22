/**
 * Component: NewServiceProductTypeModal
 * Description: Modal dialog for creating a new service product type.
 * Asset: assets/bc61be23-1c6e-4a28-904f-b85294d352df.svg
 */

import React, { useState } from 'react';

export const NewServiceProductTypeModal = ({ onClose, onSaveSuccess }) => {
  // State management for form fields
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    is_active: true // Defaulting to true as per standard ERP practice
  });

  const [errors, setErrors] = useState({});

  // Validation logic triggered on change
  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' && !value.trim()) {
      error = 'Name is required';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async () => {
    // Final validation check before submission
    if (!formData.name.trim()) {
      setErrors({ name: 'Name is required' });
      return;
    }

    try {
      const response = await fetch('/api/service_product_types', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          is_active: formData.is_active
        })
      });

      if (response.ok) {
        onSaveSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        // Handle 422 or 400 errors from API
        console.error('Submission failed', errorData);
      }
    } catch (err) {
      console.error('Network error', err);
    }
  };

  return (
    <div className="modal-container">
      {/* Title Modal */}
      <header>
        <h2>New Service Product Type</h2>
        <button onClick={onClose} aria-label="Close">X</button>
      </header>

      {/* Name Field */}
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      {/* Description Field */}
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>

      {/* Footer Actions */}
      <footer>
        <button onClick={onClose}>Cancel</button>
        <button 
          onClick={handleSubmit} 
          disabled={!formData.name.trim() || !!errors.name}
        >
          Save
        </button>
      </footer>
    </div>
  );
};