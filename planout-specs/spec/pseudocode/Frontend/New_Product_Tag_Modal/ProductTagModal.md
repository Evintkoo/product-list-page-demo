/**
 * Component: ProductTagModal
 * Asset: assets/bb3487a5-02e6-45bb-bfe2-9cfa90c85af4.svg
 * 
 * A modal dialog for creating a new product tag.
 * Includes validation for the required 'name' field.
 */

import { useState } from 'react';
import { useProductTagMutation } from './hooks/useProductTagMutation';

export const ProductTagModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const { mutate, isLoading } = useProductTagMutation();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Immediate validation feedback
    if (field === 'name' && value.trim()) {
      setErrors(prev => ({ ...prev, name: null }));
    }
  };

  const handleSave = async () => {
    if (validate()) {
      mutate(formData, {
        onSuccess: () => onClose(),
        onError: (err) => {
          // Handle 422 errors from API
          if (err.response?.data?.errors) {
            setErrors(err.response.data.errors);
          }
        }
      });
    }
  };

  return (
    <Modal>
      <ModalHeader title="New Product Tag" onClose={onClose} />
      
      <FormField label="Name" required>
        <Input 
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={errors.name}
        />
      </FormField>

      <FormField label="Description">
        <TextArea 
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </FormField>

      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button 
          variant="primary" 
          onClick={handleSave} 
          disabled={isLoading}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};