import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postStockOrder } from './api';

/**
 * New Stock Order Warehouse Page
 * Asset: assets/80b93e8b-4189-4994-adf2-2ea46b5c44b7.svg
 */
export const NewStockOrderPage = () => {
  const history = useHistory();

  // Form State
  const [formData, setFormData] = useState({
    workflow_state: 'draft',
    from_warehouse_id: '',
    to_store_id: '',
    ref_code: '',
    due_at: '',
    notes: '',
    items: [] // Array of StockOrderItem
  });

  const handleSave = async () => {
    try {
      await postStockOrder(formData);
      history.push('/stock-orders'); // Redirect to Stock Order List Page
    } catch (error) {
      console.error('Failed to create stock order', error);
    }
  };

  const handleCancel = () => {
    history.push('/stock-orders');
  };

  return (
    <div>
      <MainMenu />
      <InventorySubMenu activeTab="Store" />
      
      <NewOrderWarehouseForm 
        data={formData} 
        onChange={setFormData} 
      />
      
      <OrderProductList 
        items={formData.items} 
        onChange={(items) => setFormData({ ...formData, items })} 
      />

      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};