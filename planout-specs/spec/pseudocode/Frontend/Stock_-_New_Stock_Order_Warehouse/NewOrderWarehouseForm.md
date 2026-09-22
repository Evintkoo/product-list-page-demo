export const NewOrderWarehouseForm = ({ data, onChange }) => {
  // Validation: All fields are required for submission
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <section>
      {/* from_warehouse_id: Warehouse.id */}
      <select onChange={(e) => updateField('from_warehouse_id', e.target.value)}>
        {/* Options populated from Warehouse entity */}
      </select>

      {/* to_store_id: Store.id */}
      <select onChange={(e) => updateField('to_store_id', e.target.value)}>
        {/* Options populated from Store entity */}
      </select>

      {/* ref_code: StockOrder.ref_code */}
      <input type="text" onChange={(e) => updateField('ref_code', e.target.value)} />

      {/* due_at: StockOrder.due_at */}
      <input type="datetime-local" onChange={(e) => updateField('due_at', e.target.value)} />

      {/* notes: StockOrder.notes */}
      <textarea onChange={(e) => updateField('notes', e.target.value)} />
    </section>
  );
};