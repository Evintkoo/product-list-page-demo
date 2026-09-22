export const StockReturnWarehouseForm = ({ data, onChange }) => {
  return (
    <form>
      {/* Dropdowns for IDs */}
      <select value={data.from_store_id} onChange={(e) => onChange({...data, from_store_id: e.target.value})}>
        {/* Options populated from Store entity */}
      </select>
      
      <select value={data.to_internal_supplier_id} onChange={(e) => onChange({...data, to_internal_supplier_id: e.target.value})}>
        {/* Options populated from InternalSupplier entity */}
      </select>

      <select value={data.to_warehouse_id} onChange={(e) => onChange({...data, to_warehouse_id: e.target.value})}>
        {/* Options populated from Warehouse entity */}
      </select>

      <input 
        type="text" 
        value={data.ref_code} 
        onChange={(e) => onChange({...data, ref_code: e.target.value})} 
        placeholder="Reference Code" 
      />
      
      <textarea 
        value={data.notes} 
        onChange={(e) => onChange({...data, notes: e.target.value})} 
      />
      
      {/* ORPHAN_FIELD: document_no */}
    </form>
  );
};