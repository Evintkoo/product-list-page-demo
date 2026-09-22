import React, { useState, useEffect } from 'react';

interface DiscrepancyItem {
  id: string; // Internal UI key
  product_id: string | null;
  product_display: string; // SKU + Name
  quantity: number;
  notes: string;
}

export const NewDiscrepancyStockPage = () => {
  const [entity_id, setEntityId] = useState<string>('');
  const [items, setItems] = useState<DiscrepancyItem[]>([{ 
    id: crypto.randomUUID(), 
    product_id: null, 
    product_display: '', 
    quantity: 0, 
    notes: '' 
  }]);

  // Load initial data
  useEffect(() => {
    // GET /api/auth/me (Auth check)
    // GET /api/stores (Populate Entity Dropdown)
  }, []);

  const handleAddItem = () => {
    setItems([...items, { 
      id: crypto.randomUUID(), 
      product_id: null, 
      product_display: '', 
      quantity: 0, 
      notes: '' 
    }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = async () => {
    // Validation: entity_id required, items not empty, 
    // each item has product_id, quantity > 0, no duplicate products
    const payload = {
      entity_id,
      items: items.map(({ product_id, quantity, notes }) => ({
        product_id,
        quantity,
        notes
      }))
    };

    const response = await fetch('/api/discrepancy-stocks', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      // Redirect to Report Discrepancy Stocks list
    } else {
      // Handle 422 validation errors
    }
  };

  return (
    <div>
      <Header />
      <EntityDropdown value={entity_id} onChange={setEntityId} />
      
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>
                <ProductLookup 
                  onSelect={(product) => updateItem(item.id, { product_id: product.id })} 
                />
              </td>
              <td>
                <QuantityInput 
                  value={item.quantity} 
                  onChange={(val) => updateItem(item.id, { quantity: val })} 
                />
              </td>
              <td>
                <NotesInput 
                  value={item.notes} 
                  onChange={(val) => updateItem(item.id, { notes: val })} 
                />
              </td>
              <td>
                <DeleteTrigger onClick={() => handleRemoveItem(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddItemButton onClick={handleAddItem} />
      <CancelButton onClick={() => /* Redirect to list */} />
      <SaveButton onClick={handleSave} />
    </div>
  );
};