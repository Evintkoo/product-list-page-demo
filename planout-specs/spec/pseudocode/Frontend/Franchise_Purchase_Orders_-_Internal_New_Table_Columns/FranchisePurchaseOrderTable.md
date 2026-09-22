/**
 * Component: FranchisePurchaseOrderTable
 * Asset: assets/4af5b1d1-d89a-48b5-9a60-7a761814fd9b.svg
 * 
 * Manages the dynamic list of FranchisePurchaseOrderItem entries.
 */

// State: Array of items, each containing:
// { product_id, store_qty, order_qty, supply_price, store_remark }

function FranchisePurchaseOrderTable() {
  const [rows, setRows] = useState([createEmptyRow()]);

  const addRow = () => setRows([...rows, createEmptyRow()]);
  const removeRow = (index) => setRows(rows.filter((_, i) => i !== index));

  const updateRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Product</th>
          <th>Store Qty</th>
          <th>Order Qty</th>
          <th>Supply Price</th>
          <th>Amount (Rp)</th>
          <th>Remark</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {/* No Column */}
            <td>{index + 1}</td>

            {/* Search Product Input */}
            <td>
              <ProductSearchDropdown 
                onChange={(product) => {
                  updateRow(index, 'product_id', product.id);
                  updateRow(index, 'store_qty', product.store_qty);
                }}
                minLength={3}
                required
              />
            </td>

            {/* Store Qty (Read-only/Auto-filled) */}
            <td>{row.store_qty}</td>

            {/* Order Qty Input */}
            <td>
              <NumericInput 
                value={row.order_qty}
                onChange={(val) => updateRow(index, 'order_qty', val)}
                required
              />
            </td>

            {/* Supply Price Input */}
            <td>
              <NumericInput 
                value={row.supply_price}
                onChange={(val) => updateRow(index, 'supply_price', val)}
                required
              />
            </td>

            {/* Amount (Calculated) */}
            <td>{row.order_qty * row.supply_price}</td>

            {/* Store Remark Input */}
            <td>
              <TextInput 
                value={row.store_remark}
                onChange={(val) => updateRow(index, 'store_remark', val)}
                required
              />
            </td>

            {/* X Button */}
            <td>
              <IconButton onClick={() => removeRow(index)}>X</IconButton>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5}>Total</td>
          <td>{rows.reduce((acc, row) => acc + (row.order_qty * row.supply_price), 0)}</td>
        </tr>
      </tfoot>
      <button onClick={addRow}>Add Product</button>
    </table>
  );
}