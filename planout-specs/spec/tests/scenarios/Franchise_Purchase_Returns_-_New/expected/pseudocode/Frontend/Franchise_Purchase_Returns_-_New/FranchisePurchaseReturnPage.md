import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Asset: assets/ba64eca6-ba19-4615-9b2f-3e87cfff5830.svg
 */
export const FranchisePurchaseReturnPage = () => {
  const [stores, setStores] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [items, setItems] = useState([]); // PurchaseReturnItem[]
  
  const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      workflow_state: 'draft',
      type: 'franchise_purchase_return',
      receiver_location_type: 'supplier'
    }
  });

  const selectedStore = watch('sender_location_id');
  const selectedSupplier = watch('receiver_location_id');

  // Initial Data Fetching
  useEffect(() => {
    fetch('/api/stores').then(res => res.json()).then(setStores);
    fetch('/api/suppliers').then(res => res.json()).then(data => {
      // Filter for internal suppliers only
      setSuppliers(data.filter(s => s.is_internal === true));
    });
  }, []);

  // Fetch Purchase Orders when dependencies are met
  useEffect(() => {
    if (selectedStore && selectedSupplier) {
      // Logic: Search triggers after 3 chars, but here we fetch available options
      fetch(`/api/franchise-purchase-orders?store_id=${selectedStore}&supplier_id=${selectedSupplier}`)
        .then(res => res.json())
        .then(setPurchaseOrders);
    }
  }, [selectedStore, selectedSupplier]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      items: items
    };
    
    const response = await fetch('/api/purchase-returns', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      // Redirect to confirmed state page
      window.location.href = '/inventory/purchase-returns/confirmed';
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Header: Workflow Status */}
      <WorkflowStatusTracker state={watch('workflow_state')} />

      {/* Form Fields */}
      <input {...register('ref_code')} readOnly placeholder="FPR/..." />
      
      <select {...register('sender_location_id', { required: true })}>
        {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <select {...register('receiver_location_id', { required: true })}>
        {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <select {...register('purchase_order_id')}>
        {purchaseOrders.map(po => <option key={po.id} value={po.id}>{po.ref_code}</option>)}
      </select>

      <textarea {...register('notes')} />

      {/* Products Table */}
      <ProductsTable items={items} />

      {/* Actions */}
      <button type="button" onClick={() => window.history.back()}>Cancel</button>
      <button type="submit">Save</button>
    </form>
  );
};