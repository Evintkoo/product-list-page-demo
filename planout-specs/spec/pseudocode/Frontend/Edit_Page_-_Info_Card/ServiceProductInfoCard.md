/**
 * Component: ServiceProductInfoCard
 * Description: Main detail edit component for Service Product.
 * Asset: assets/adefe9a9-cdb5-4ff4-ae45-2d5acb9aa5a4.svg
 */

import React, { useState, useEffect } from 'react';

export const ServiceProductInfoCard = ({ initialData }) => {
  // State management for form fields
  const [formData, setFormData] = useState({
    type: initialData.type || '',
    name: initialData.name || '',
    sku: initialData.sku || '',
    description: initialData.description || '',
    tags: initialData.tags || [] // Array of strings/objects
  });

  // Validation state
  const [errors, setErrors] = useState({});

  // Validation logic (triggered immediately on change)
  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' && !value) error = 'Name is required';
    if (name === 'sku' && !value) error = 'SKU is required';
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  return (
    <div className="info-card-container">
      {/* Type Field */}
      <div className="field-group">
        <label>Type</label>
        <Dropdown
          value={formData.type}
          options={typeOptions} // Fetched from API/State
          onChange={(val) => handleChange('type', val)}
          clearable
        />
        <button onClick={() => setShowTypeModal(true)}>New Type</button>
      </div>

      {/* Name Field */}
      <div className="field-group">
        <label>Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      {/* SKU Field */}
      <div className="field-group">
        <label>SKU <HelpIcon tooltip="Unique identifier for the service" /></label>
        <input
          type="text"
          value={formData.sku}
          onChange={(e) => handleChange('sku', e.target.value)}
          required
        />
        {errors.sku && <span className="error">{errors.sku}</span>}
      </div>

      {/* Description Field */}
      <div className="field-group">
        <label>Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      {/* Tag Field */}
      <div className="field-group">
        <label>Tag</label>
        <MultiSelect
          value={formData.tags}
          options={tagOptions}
          onChange={(vals) => handleChange('tags', vals)}
          renderChip={(tag) => <Chip label={tag} onRemove={() => removeTag(tag)} />}
        />
        <button onClick={() => setShowTagModal(true)}>New Tag</button>
      </div>

      {/* Modals */}
      {showTypeModal && (
        <NewServiceProductTypeModal 
          onClose={() => setShowTypeModal(false)}
          onSuccess={(newType) => {
            addTypeToDropdown(newType);
            handleChange('type', newType);
          }}
        />
      )}

      {showTagModal && (
        <NewServiceProductTagsModal 
          onClose={() => setShowTagModal(false)}
          onSuccess={(newTag) => {
            addTagToDropdown(newTag);
            handleChange('tags', [...formData.tags, newTag]);
          }}
        />
      )}
    </div>
  );
};

// ORPHAN_FIELD: typeOptions
// ORPHAN_FIELD: tagOptions
// ORPHAN_FIELD: showTypeModal
// ORPHAN_FIELD: showTagModal
// ORPHAN_FIELD: addTypeToDropdown
// ORPHAN_FIELD: addTagToDropdown
// ORPHAN_FIELD: removeTag