import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { postStockOpname, getNewStockOpnameMetadata } from './api';

/**
 * Asset: assets/ec5da0be-7e61-4ab3-8425-fe8638ee3422.svg
 */
export const NewStockOpnamePage = () => {
  const [metadata, setMetadata] = useState({ stores: [], product_types: [], product_brands: [], suppliers: [] });
  
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      workflow_state: 'DRAFT',
      store_id: '',
      document_date: new Date().toISOString().split('T')[0],
      completed_at: null,
      notes: '',
      request_uuid: crypto.randomUUID(),
      items: [],
      autofill_criteria: {
        product_type_id: null,
        product_brand_id: null,
        supplier_id: null,
        product_info_field: 'name',
        product_info_match_type: 'contains',
        product_info_value: '',
        sort_by: 'name',
        include_zero_stock: false,
        movement_days: null
      }
    }
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  useEffect(() => {
    getNewStockOpnameMetadata().then(setMetadata);
  }, []);

  const onSubmit = async (data) => {
    // Validation: Ensure no duplicate product_id in items
    const productIds = data.items.map(i => i.product_id);
    if (new Set(productIds).size !== productIds.length) {
      alert("Duplicate products found in the list.");
      return;
    }

    try {
      await postStockOpname(data);
      window.location.href = '/stock-opname'; // Redirect to List Page
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header: Workflow Status Bar (Read-only display) */}
      <div className="workflow-status">DRAFT</div>

      {/* Main Form Card */}
      <section>
        <select {...register('store_id', { required: true })}>
          {metadata.stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        
        <input type="date" {...register('document_date')} />
        <input type="datetime-local" {...register('completed_at')} />
        <textarea {...register('notes')} />
      </section>

      {/* Autofill Criteria Section */}
      <section>
        <select {...register('autofill_criteria.product_type_id')}>{/* ...options */}</select>
        <input type="number" {...register('autofill_criteria.movement_days', { min: 0 })} />
        <input type="checkbox" {...register('autofill_criteria.include_zero_stock')} />
      </section>

      {/* Items List */}
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.product_id`, { required: true })} />
          <input 
            type="number" 
            {...register(`items.${index}.counted_qty`, { 
              min: { value: 0, message: "Counted quantity cannot be negative" } 
            })} 
          />
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}

      {/* Actions */}
      <button type="button" onClick={() => window.location.href = '/stock-opname'}>Cancel</button>
      <button type="submit">Save</button>
    </form>
  );
};