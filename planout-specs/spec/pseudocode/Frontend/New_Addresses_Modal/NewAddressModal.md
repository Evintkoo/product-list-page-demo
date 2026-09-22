import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

/**
 * NewAddressModal Component
 * Asset: assets/47db083f-025a-4abb-9e07-83c02da47121.svg
 */
export const NewAddressModal = ({ onClose, onSave }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // Validation logic for phone numbers
  const phoneValidation = {
    pattern: {
      value: /^[0-9+\-\s()]{7,20}$/,
      message: "Invalid phone number format"
    }
  };

  const onSubmit = async (data) => {
    // Logic to call API endpoint (e.g., POST /addresses)
    await onSave(data);
    onClose();
  };

  return (
    <div className="modal-container">
      <header>
        <h2>Address</h2>
        <button onClick={onClose} aria-label="Close">X</button>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Address Type */}
        <input {...register("address_type", { required: true })} placeholder="Address Type" />
        
        {/* Country & Province */}
        <input {...register("country")} placeholder="Country" />
        <input {...register("province")} placeholder="Province" />

        {/* Location Dropdowns */}
        <select {...register("regency")}> {/* ORPHAN_FIELD: regency */}
          <option value="">Select Regency</option>
        </select>
        
        <select {...register("district")}> {/* ORPHAN_FIELD: district */}
          <option value="">Select District</option>
        </select>

        <select {...register("village")}> {/* ORPHAN_FIELD: village */}
          <option value="">Select Village</option>
        </select>

        <select {...register("postal_code")}> {/* ORPHAN_FIELD: postal_code */}
          <option value="">Select Postal Code</option>
        </select>

        {/* Full Address */}
        <textarea {...register("address")} placeholder="Full Street Address" />

        {/* Coordinates */}
        <input {...register("latitude")} placeholder="Latitude" />
        <input {...register("longitude")} placeholder="Longitude" />

        {/* Contact Info */}
        <input {...register("phone_1", phoneValidation)} placeholder="Primary Phone" />
        {errors.phone_1 && <span>{errors.phone_1.message}</span>}

        <input {...register("phone_2", phoneValidation)} placeholder="Secondary Phone" />
        {errors.phone_2 && <span>{errors.phone_2.message}</span>}

        <input {...register("fax")} placeholder="Fax" />

        <footer>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">Save</button>
        </footer>
      </form>
    </div>
  );
};