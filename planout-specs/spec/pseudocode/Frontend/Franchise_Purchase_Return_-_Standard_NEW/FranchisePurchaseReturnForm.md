/**
 * Component: FranchisePurchaseReturnForm
 * Asset: assets/0327895c-dd34-4ff8-9629-05c967b1f4cb.svg
 * 
 * Handles the creation of a new standard franchise purchase return.
 */

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { api } from './api-client';

export const FranchisePurchaseReturnForm = () => {
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      sender_location_id: '',
      receiver_location_id: '',
      source_order_id: null,
      document_no: '', // Auto-generated
      reference_no: '',
      notes: '',
      items: []
    }
  });

  const { fields } = useFieldArray({ control, name: 'items' });

  // Fetch initial data
  useEffect(() => {
    // Load Stores for sender_location_id
    api.get('/api/stores').then(res => setStores(res.data));
    // Load Suppliers for receiver_location_id (is_internal: true)
    api.get('/api/suppliers').then(res => setSuppliers(res.data));
  }, []);

  const onSubmit = async (data) => {
    // Mapping rules applied here
    const payload = {
      sender_location_id: data.sender_location_id,
      receiver_location_id: data.receiver_location_id,
      source_order_id: data.source_order_id,
      document_no: data.document_no,
      reference_no: data.reference_no,
      notes: data.notes,
      items: data.items.map(item => ({
        product_id: item.product_id,
        store_qty: item.store_qty,
        order_qty: item.order_qty,
        max_return_qty: item.max_return_qty,
        return_qty: item.return_qty,
        reason: item.reason
      }))
    };

    try {
      const response = await api.post('/franchise_purchase_returns', payload);
      // Redirect to Details page on success
      window.location.href = `/franchise-purchase-returns/${response.data.id}`;
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header Fields */}
      <select {...register('sender_location_id', { required: true })}>...</select>
      <select {...register('receiver_location_id', { required: true })}>...</select>
      <input {...register('document_no')} readOnly />
      <input {...register('reference_no')} />
      <textarea {...register('notes')} />

      {/* Items Table */}
      <table>
        {fields.map((field, index) => (
          <tr key={field.id}>
            <td>{index + 1}</td>
            <td>{/* Product Name (Read-only) */}</td>
            <td>{/* Store Qty (Read-only) */}</td>
            <td>{/* Order Qty (Read-only) */}</td>
            <td>{/* Max Return Qty (Read-only) */}</td>
            <td>
              <input 
                type="number" 
                {...register(`items.${index}.return_qty`, { 
                  required: true,
                  validate: (val) => val <= watch(`items.${index}.max_return_qty`) 
                })} 
              />
            </td>
            <td><input {...register(`items.${index}.reason`)} /></td>
          </tr>
        ))}
      </table>

      <button type="button" onClick={() => window.location.href = '/franchise-purchase-returns'}>Cancel</button>
      <button type="submit">Save</button>
    </form>
  );
};