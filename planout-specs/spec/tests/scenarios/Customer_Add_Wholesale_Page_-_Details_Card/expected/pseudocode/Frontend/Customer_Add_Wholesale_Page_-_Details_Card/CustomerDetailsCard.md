import React, { useState } from 'react';

/**
 * Asset: assets/2a103aa4-c7bd-4cec-9f9d-f79ea9c69478.svg
 */
export const CustomerDetailsCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    customer_code: '',
    phone: '',
    email: '',
    ktp: '',
    area_region: '',
    notes: '',
    contact_full_name: '',
    contact_phone: '',
    contact_email: '',
    contact_position: '',
    contact_department: '',
    contact_region: '',
    contact_country: '',
    contact_address: '',
    detail_bank: ''
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' && !value) error = 'Name is required';
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format';
    if (name === 'contact_email' && value && !/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format';
    
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  return (
    <div className="details-card-container">
      {/* Customer Identification */}
      <input name="name" placeholder="Name *" onChange={handleChange} />
      {errors.name && <span>{errors.name}</span>}
      
      <input name="customer_code" placeholder="Customer Code" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      {errors.email && <span>{errors.email}</span>}
      <input name="ktp" placeholder="KTP" onChange={handleChange} />
      <input name="area_region" placeholder="Area/Region" onChange={handleChange} />
      <textarea name="notes" placeholder="Notes" onChange={handleChange} />

      {/* Contact Information */}
      <input name="contact_full_name" placeholder="Contact Full Name" onChange={handleChange} />
      <input name="contact_phone" placeholder="Contact Phone" onChange={handleChange} />
      <input name="contact_email" placeholder="Contact Email" onChange={handleChange} />
      {errors.contact_email && <span>{errors.contact_email}</span>}
      <input name="contact_position" placeholder="Contact Position" onChange={handleChange} />
      <input name="contact_department" placeholder="Contact Department" onChange={handleChange} />
      <input name="contact_region" placeholder="Contact Region" onChange={handleChange} />
      
      <select name="contact_country" onChange={handleChange}>
        <option value="">Select Country</option>
        {/* Country options mapping */}
      </select>
      
      <input name="contact_address" placeholder="Contact Address" onChange={handleChange} />

      {/* Banking */}
      <textarea name="detail_bank" placeholder="Detail Bank" onChange={handleChange} />
    </div>
  );
};

// ORPHAN_FIELD: area_region (Mapped from "Area/Region" node)
// ORPHAN_FIELD: contact_full_name (Mapped from "Contact Full Name" node)
// ORPHAN_FIELD: contact_phone (Mapped from "Contact Phone" node)
// ORPHAN_FIELD: contact_email (Mapped from "Contact Email" node)
// ORPHAN_FIELD: contact_position (Mapped from "Contact Position" node)
// ORPHAN_FIELD: contact_department (Mapped from "Contact Department" node)
// ORPHAN_FIELD: contact_region (Mapped from "Contact Region" node)
// ORPHAN_FIELD: contact_country (Mapped from "Contact Country" node)
// ORPHAN_FIELD: contact_address (Mapped from "Contact Address" node)
// ORPHAN_FIELD: detail_bank (Mapped from "Detail Bank" node)