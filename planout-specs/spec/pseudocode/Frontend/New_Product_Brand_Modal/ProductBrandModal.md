/**
 * Component: ProductBrandModal
 * Asset: assets/792eec10-f635-4c32-9572-673a2add7c1c.svg
 * 
 * A modal dialog for creating a new product brand.
 * Validates inputs immediately upon change.
 */

import React, { useState } from 'react';
import { useProductBrandMutation } from './hooks/useProductBrand';

export const ProductBrandModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const { mutate: createBrand, isLoading } = useProductBrandMutation();

  const validate = (field, value) => {
    const newErrors = { ...errors };
    if (field === 'name') {
      if (!value || value.trim() === '') {
        newErrors.name = 'Name is required';
      } else {
        delete newErrors.name;
      }
    }
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSave = () => {
    if (Object.keys(errors).length === 0 && formData.name.trim() !== '') {
      createBrand(formData, {
        onSuccess: () => onClose(),
        onError: (err) => {
          // Handle 422 errors from API
          if (err.response?.data?.field) {
            setErrors({ [err.response.data.field]: err.response.data.message });
          }
        }
      });
    }
  };

  return (
    <Modal title="New Product Brand" onClose={onClose}>
      {/* Name Field */}
      <InputField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      {/* Description Field */}
      <TextAreaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      {/* Footer Actions */}
      <Button onClick={onClose}>Cancel</Button>
      <Button 
        primary 
        onClick={handleSave} 
        disabled={isLoading || !!errors.name || !formData.name}
      >
        Save
      </Button>
    </Modal>
  );
};