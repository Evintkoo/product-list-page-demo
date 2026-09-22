function ReturnItemsTable({ items, status }) {
  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>SKU</th>
          <th>Product</th>
          <th>Remaining</th>
          <th>Warehouse</th>
          <th>Return</th>
          {status === 'approved_confirmed_by_supplier' && <th>Supplier Confirmed</th>}
          <th>Confirmed</th>
          <th>Price (IDR)</th>
          <th>Type</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.sku}</td>
            <td>{item.product_name}</td>
            <td>{item.remaining_qty}</td>
            <td>{item.warehouse_qty}</td>
            <td>{item.return_qty}</td>
            {status === 'approved_confirmed_by_supplier' && <td>{item.supplier_confirmed_qty}</td>}
            <td>{item.confirmed_qty}</td>
            <td>{item.price}</td>
            <td>{item.type}</td>
            <td>{item.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}