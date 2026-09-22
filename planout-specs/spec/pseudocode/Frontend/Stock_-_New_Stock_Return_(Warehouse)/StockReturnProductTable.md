export const StockReturnProductTable = ({ items, onChange }) => {
  const addRow = () => {
    const newItem = { product_id: '', store_quantity: 0, quantity: 0, reason: '' };
    onChange([...items, newItem]);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Store Quantity</th>
          <th>Return Quantity</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{/* Product Selector */}</td>
            <td>
              <input 
                type="number" 
                value={item.store_quantity}
                onChange={(e) => {
                  // Validation: quantity must not exceed store_quantity
                  const val = parseFloat(e.target.value);
                  onChange(items.map((i, idx) => idx === index ? {...i, store_quantity: val} : i));
                }}
              />
            </td>
            <td>
              <input 
                type="number" 
                value={item.quantity}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  onChange(items.map((i, idx) => idx === index ? {...i, quantity: val} : i));
                }}
              />
            </td>
            <td>
              <input 
                type="text" 
                value={item.reason}
                onChange={(e) => onChange(items.map((i, idx) => idx === index ? {...i, reason: e.target.value} : i))}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <button onClick={addRow}>Add Product</button>
    </table>
  );
};