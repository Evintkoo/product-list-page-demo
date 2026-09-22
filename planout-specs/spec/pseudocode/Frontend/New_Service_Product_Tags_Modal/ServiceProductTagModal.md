import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postServiceProductTag } from './api/serviceProductTags'; // Logic layer reference

/**
 * Asset: assets/17e9819e-935d-436f-b8ad-b7f3c0a51208.svg
 * Modal for creating a new service product tag.
 */
export const ServiceProductTagModal = ({ onClose, onSuccess }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      description: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await postServiceProductTag(data);
      onSuccess(response);
      onClose();
    } catch (error) {
      // Handle API errors (422 validation or server errors)
      console.error("Failed to create tag", error);
    }
  };

  return (
    <div className="modal-container">
      {/* Title Modal */}
      <header>
        <h2>New Service Product Tag</h2>
        <button onClick={onClose} aria-label="Close">X</button>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <div className="field-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register("name", { 
              required: "Name is required",
              maxLength: { value: 255, message: "Name is too long" }
            })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        {/* Description Field */}
        <div className="field-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description")}
          />
        </div>

        {/* Footer Actions */}
        <footer>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit" disabled={isSubmitting}>Save</button>
        </footer>
      </form>
    </div>
  );
};