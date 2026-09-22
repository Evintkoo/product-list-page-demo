/**
 * Component: FranchisePurchaseOrderForm
 * Asset: assets/b12ea73a-9500-4023-a260-846ed11ba111.svg
 * 
 * This component manages the creation of internal franchise purchase orders.
 * It integrates the header form (warehouse, store, supplier, etc.) and the 
 * dynamic line item table.
 */

import React, { useState } from 'react';

export const FranchisePurchaseOrderForm = () => {
  // Form State
  const [formData, setFormData] = useState({
    workflow_state: 'draft',
    order_type: 'internal',
    warehouse_id: '',
    store_id: '',
    supplier_id: '',
    supplier_ref_code: '',
    due_at: '',
    notes: '',
    line_items: [] // Array of { product_id, store_qty, order_qty, supply_price, store_remark }
  });

  // Validation Logic
  const validateForm = () => {
    // Ensure required fields are present before submission
    return (
      formData.warehouse_id &&
      formData.store_id &&
      formData.supplier_id &&
      formData.due_at &&
      formData.line_items.length > 0
    );
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields and add at least one product.");
      return;
    }

    try {
      const response = await fetch('/api/franchise_purchase_orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        // Navigate to detail page using returned id
        window.location.href = `/franchise_purchase_orders/${data.id}`;
      }
    } catch (error) {
      console.error("Failed to create purchase order", error);
    }
  };

  return (
    <div>
      <MenuNavigationPanel active="Inventory" />
      <WorkflowStatusTracker currentStatus={formData.workflow_state} />
      
      {/* Internal New Order Component (Header) */}
      <div className="form-card">
        <select onChange={(e) => setFormData({...formData, warehouse_id: e.target.value})}>
          {/* Options populated from warehouse list */}
        </select>
        <select onChange={(e) => setFormData({...formData, store_id: e.target.value})}>
          {/* Options populated from store list */}
        </select>
        <select onChange={(e) => setFormData({...formData, supplier_id: e.target.value})}>
          {/* Options populated from supplier list */}
        </select>
        <input 
          type="text" 
          placeholder="Supplier Ref Code"
          onChange={(e) => setFormData({...formData, supplier_ref_code: e.target.value})}
        />
        <input 
          type="datetime-local" 
          onChange={(e) => setFormData({...formData, due_at: e.target.value})}
        />
        <textarea 
          onChange={(e) => setFormData({...formData, notes: e.target.value})}
        />
      </div>

      {/* Order Product Component (Table) */}
      <OrderProductTable 
        items={formData.line_items} 
        onChange={(items) => setFormData({...formData, line_items: items})} 
      />

      <button onClick={() => window.history.back()}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};