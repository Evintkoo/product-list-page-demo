import React, { useState } from 'react';

/**
 * Asset: assets/624c473e-b0e4-467d-97bf-359380159b32.svg
 * Page to add new stock return (warehouse)
 */
export const NewStockReturnPage = () => {
  const [formData, setFormData] = useState({
    workflow_state: 'draft',
    type: 'warehouse',
    from_store_id: '',
    to_internal_supplier_id: '',
    to_warehouse_id: '',
    ref_code: '',
    notes: '',
    items: [] // Array of StockReturnItem objects
  });

  const handleSave = async () => {
    // POST /api/stock_returns
    const response = await fetch('/api/stock_returns', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      // Redirect to confirmed state page
    }
  };

  return (
    <div>
      <MenuNavigationPanel activeModule="Inventory" />
      <WorkflowStatusTracker state={formData.workflow_state} />
      
      <StockReturnWarehouseForm 
        data={formData} 
        onChange={setFormData} 
      />
      
      <StockReturnProductTable 
        items={formData.items} 
        onChange={(items) => setFormData({...formData, items})} 
      />

      <button onClick={() => window.location.href = '/stock-returns'}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};