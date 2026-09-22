import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { api } from './api-client'; // Standardized API client

/**
 * Asset: assets/62afbfe3-33ce-4165-8c61-c424c20aabe9.svg
 */
export const ServiceProductAddPage = () => {
  const [taxRates, setTaxRates] = useState([]);
  const [unitsOfMeasure, setUnitsOfMeasure] = useState([]);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      including_tax: false,
      price_ex_tax: 0
    }
  });

  // Watch pricing fields for real-time calculation
  const price = watch('price');
  const including_tax = watch('including_tax');

  useEffect(() => {
    // Fetch initial dropdown data
    api.get('/api/service_products/new').then(res => {
      setTaxRates(res.data.tax_rates);
      setUnitsOfMeasure(res.data.units_of_measure);
    });
  }, []);

  // Logic: If Including Tax is unchecked, price_ex_tax = price.
  // If checked, price_ex_tax is derived (stripped).
  useEffect(() => {
    if (!including_tax) {
      setValue('price_ex_tax', price);
    } else {
      // Logic: Derive price_ex_tax from price (assuming tax rate logic applied)
      // Placeholder for tax calculation logic
      setValue('price_ex_tax', price / 1.1); // <!-- ORPHAN_FIELD: tax_rate_calculation_logic -->
    }
  }, [price, including_tax, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/service_products/', data);
      // Navigate to detail page using response.data.id
      window.location.href = `/service-products/${response.data.id}`;
    } catch (error) {
      console.error("Failed to create service product", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>New Service Product</h1>
      
      {/* Details Card */}
      <section>
        <input {...register('name', { required: true })} placeholder="Name" />
        <textarea {...register('description')} placeholder="Description" />
        {/* <!-- ORPHAN_FIELD: SKU --> */}
        {/* <!-- ORPHAN_FIELD: Type --> */}
        {/* <!-- ORPHAN_FIELD: Tag --> */}
        <button type="button">New Type</button>
        <button type="button">New Tag</button>
      </section>

      {/* Store Pricing Card */}
      <section>
        <input type="number" {...register('price', { min: 0 })} />
        <input type="checkbox" {...register('including_tax')} />
      </section>

      {/* Tax Card */}
      <section>
        {/* <!-- ORPHAN_FIELD: Tax --> */}
        {/* <!-- ORPHAN_FIELD: Other Tax --> */}
        {/* <!-- ORPHAN_FIELD: Other Tax Account --> */}
        {/* <!-- ORPHAN_FIELD: Other Tax Refund Account --> */}
        {/* <!-- ORPHAN_FIELD: Tax Unit of Measure --> */}
        {/* <!-- ORPHAN_FIELD: Tax Product Code --> */}
      </section>

      {/* Settings Card */}
      <section>
        {/* <!-- ORPHAN_FIELD: Active --> */}
        {/* <!-- ORPHAN_FIELD: Open Price --> */}
        {/* <!-- ORPHAN_FIELD: Estimated Time --> */}
        {/* <!-- ORPHAN_FIELD: Open Estimated Time --> */}
      </section>

      <footer>
        <button type="button" onClick={() => window.history.back()}>Cancel</button>
        <button type="submit">Save</button>
      </footer>
    </form>
  );
};