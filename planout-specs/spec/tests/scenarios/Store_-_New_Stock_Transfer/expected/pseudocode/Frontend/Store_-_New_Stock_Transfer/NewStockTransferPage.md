// Component: NewStockTransferPage
// Asset: assets/04ee44aa-f176-4007-b505-d59c0ba97e60.svg

import { useState, useEffect, useMemo } from 'react';

export default function NewStockTransferPage() {
  // Form State
  const [source_location_id, setSourceLocationId] = useState('');
  const [destination_location_id, setDestinationLocationId] = useState('');
  const [ref_code, setRefCode] = useState('');
  const [due_date, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState([]); // Array of { product_id, transferred_qty, avg_cost, ... }
  
  // Initialization
  useEffect(() => {
    // 1. Check auth: GET /api/auth/me
    // 2. Fetch locations: GET /api/stores
    // 3. Set default Transfer Type to "Sent" <!-- ORPHAN_FIELD: transfer_type -->
  }, []);

  // Validation Logic
  const isFormValid = useMemo(() => {
    return (
      source_location_id && 
      destination_location_id && 
      source_location_id !== destination_location_id &&
      items.length > 0 &&
      items.every(item => item.transferred_qty > 0)
    );
  }, [source_location_id, destination_location_id, items]);

  // Handlers
  const handleAddProduct = (product) => {
    if (items.find(i => i.id === product.id)) return;
    setItems([...items, { ...product, transferred_qty: 0 }]);
  };

  const handleUpdateQty = (index, qty) => {
    const newItems = [...items];
    newItems[index].transferred_qty = qty;
    setItems(newItems);
  };

  const handleSave = async () => {
    if (!isFormValid) return;

    const payload = {
      source_location_id,
      destination_location_id,
      ref_code,
      due_date,
      notes,
      items: items.map(i => ({
        product_id: i.id,
        transferred_qty: i.transferred_qty
      }))
    };

    const response = await fetch('/api/stock-transfers', {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      // Redirect to detail page
    } else {
      // Show error reason
    }
  };

  return (
    <div>
      <PageTitle>New Stock Transfer</PageTitle>
      <WorkflowStatusBar status="Draft" />
      
      {/* Header Inputs */}
      <Select name="source_location_id" onChange={setSourceLocationId} />
      <Select name="destination_location_id" onChange={setDestinationLocationId} />
      <Input name="ref_code" onChange={setRefCode} />
      <DateInput name="due_date" onChange={setDueDate} />
      <TextArea name="notes" onChange={setNotes} />

      {/* Products Table */}
      <ProductsTable 
        items={items} 
        onUpdateQty={handleUpdateQty}
        sourceLocation={source_location_id}
      />
      
      <AddProductButton onClick={handleAddProduct} disabled={!source_location_id} />
      <UploadManagerButton />
      
      <TotalStockCost value={items.reduce((acc, i) => acc + (i.transferred_qty * i.avg_cost), 0)} />
      
      <CancelButton />
      <SaveButton onClick={handleSave} disabled={!isFormValid} />
    </div>
  );
}