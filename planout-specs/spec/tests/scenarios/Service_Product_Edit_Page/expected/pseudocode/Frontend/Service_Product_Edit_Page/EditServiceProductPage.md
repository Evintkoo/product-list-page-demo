import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from './api'; // Assuming standard axios/fetch wrapper

/**
 * Edit Service Product Page
 * Asset: assets/4781a28b-c84b-491b-af6a-fcbf87826d7c.svg
 */
export const EditServiceProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    price: 0,
    type_id: '',
    tag_id: '',
    tax_id: '',
    other_tax_id: '',
    account_id: '',
    tax_product_code_id: '',
    tax_unit_of_measure_id: ''
  });

  // ORPHAN_FIELD: Active
  // ORPHAN_FIELD: Open Price
  // ORPHAN_FIELD: Estimated Time
  // ORPHAN_FIELD: Open Estimated Time
  // ORPHAN_FIELD: Including Tax

  useEffect(() => {
    // Load initial data
    api.get(`/api/service_products/${id}/edit`)
      .then(response => setFormData(response.data));
  }, [id]);

  const handleSave = async () => {
    try {
      await api.patch(`/api/service_products/${id}`, formData);
      navigate('/products'); // Redirect to list/detail
    } catch (error) {
      // Handle 422 validation errors from API
    }
  };

  return (
    <div>
      <h1>Edit Service Product *</h1>
      
      {/* Info Card */}
      <section>
        <input name="sku" value={formData.sku} onChange={updateField} />
        <input name="name" value={formData.name} onChange={updateField} />
        <textarea name="description" value={formData.description} onChange={updateField} />
        <select name="type_id" value={formData.type_id} onChange={updateField} />
        <select name="tag_id" value={formData.tag_id} onChange={updateField} />
      </section>

      {/* Store Pricing Card */}
      <section>
        <input name="price" type="number" value={formData.price} onChange={updateField} />
      </section>

      {/* Tax Card */}
      <section>
        <select name="tax_id" value={formData.tax_id} onChange={updateField} />
        <select name="other_tax_id" value={formData.other_tax_id} onChange={updateField} />
        <select name="account_id" value={formData.account_id} onChange={updateField} />
        <select name="tax_product_code_id" value={formData.tax_product_code_id} onChange={updateField} />
        <select name="tax_unit_of_measure_id" value={formData.tax_unit_of_measure_id} onChange={updateField} />
      </section>

      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};