// Logic for individual row calculation
// Triggered by: Add Product Logic
// API: GET /api/stock-transfers/product-lookup?search={query}&location_id={source_location_id}

export function ProductRow({ item, onQtyChange }) {
  // Columns: No, Product, Source Qty, Dest Qty, Transfer Qty, Sender Average Cost, Total Cost
  // Total Cost = transferred_qty * avg_cost
  return (
    <tr>
      <td>{/* No */}</td>
      <td>{item.name}</td>
      <td>{item.source_qty}</td>
      <td>{item.dest_qty}</td>
      <td>
        <input 
          type="number" 
          value={item.transferred_qty} 
          onChange={(e) => onQtyChange(e.target.value)} 
        />
      </td>
      <td>{item.avg_cost}</td>
      <td>{item.transferred_qty * item.avg_cost}</td>
    </tr>
  );
}