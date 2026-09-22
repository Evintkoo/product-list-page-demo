/**
 * Individual Row Component
 * Maps to StockReturnItem schema fields.
 */
const StockReturnRow = ({ data, updateRow, onRemove }) => {
  
  // Validation: Return Qty must be numeric and <= store_qty
  const validateReturnQty = (val: number) => {
    if (val > data.store_qty) return "Return quantity cannot exceed store quantity";
    return null;
  };

  return (
    <tr>
      <td>{/* No column: index + 1 */}</td>
      
      <td>
        <ProductSearchInput onSelect={(val) => updateRow({ ...val })} />
      </td>
      
      <td>{data.store_qty}</td>
      
      <td>
        <input 
          type="number" 
          value={data.return_qty} 
          onChange={(e) => updateRow({ return_qty: parseInt(e.target.value) })}
          required 
        />
      </td>
      
      <td>
        <select value={data.type} onChange={(e) => updateRow({ type: e.target.value })}>
          <option value="Return">Return</option>
          <option value="Claim">Claim</option>
        </select>
      </td>
      
      <td>
        <input 
          type="text" 
          value={data.reason} 
          onChange={(e) => updateRow({ reason: e.target.value })}
          required 
        />
      </td>
      
      <td>
        <button onClick={onRemove}>X</button>
      </td>
    </tr>
  );
};