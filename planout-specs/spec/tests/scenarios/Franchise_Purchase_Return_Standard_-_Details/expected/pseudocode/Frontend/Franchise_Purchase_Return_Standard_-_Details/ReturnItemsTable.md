export const ReturnItemsTable = ({ items }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>SKU</th> <!-- ORPHAN_FIELD: sku -->
          <th>Product</th>
          <th>Return Qty</th>
          <th>Confirmed Qty</th> <!-- ORPHAN_FIELD: confirmed_qty -->
          <th>Price</th>
          <th>Type</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.product_id}</td>
            <td>{item.quantity}</td>
            <td>{item.unit_price}</td>
            <td>{item.reason_code}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};