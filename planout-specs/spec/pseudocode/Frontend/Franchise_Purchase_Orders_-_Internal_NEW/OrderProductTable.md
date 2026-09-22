/**
 * Component: OrderProductTable
 * Handles the dynamic list of products for the purchase order.
 */

export const OrderProductTable = ({ items, onChange }) => {
  // Validation: Ensure quantities are positive integers
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    onChange(newItems);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Store Qty</th>
          <th>Order Qty</th>
          <th>Supply Price (IDR)</th>
          <th>Store Remark</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{/* Product Selector */}</td>
            <td><input type="number" onChange={(e) => updateItem(index, 'store_qty', parseInt(e.target.value))} /></td>
            <td><input type="number" onChange={(e) => updateItem(index, 'order_qty', parseInt(e.target.value))} /></td>
            <td><input type="number" onChange={(e) => updateItem(index, 'supply_price', parseFloat(e.target.value))} /></td>
            <td><input type="text" onChange={(e) => updateItem(index, 'store_remark', e.target.value)} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};