export const ProductsTable = ({ items }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Store Quantity</th>
          <th>Order Quantity</th>
          <th>Max Return Quantity</th>
          <th>Return Quantity</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.product_id}>
            <td>{/* Product Name */}</td>
            <td>{/* store_quantity */} <!-- ORPHAN_FIELD: store_quantity --></td>
            <td>{/* order_quantity */} <!-- ORPHAN_FIELD: order_quantity --></td>
            <td>{/* max_return_quantity */} <!-- ORPHAN_FIELD: max_return_quantity --></td>
            <td><input type="number" value={item.quantity} /></td>
            <td><input type="text" /> <!-- ORPHAN_FIELD: reason --></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};