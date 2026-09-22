export const InternalDetailTableComponent = ({ items }) => {
  // Mapping items to table rows
  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>SKU</th>
          <th>Product</th>
          <th>Product Code</th>
          <th>Order</th>
          <th>Sent</th>
          <th>Receive</th>
          <th>Supply Price</th>
          <th>Order Amount</th>
          <th>Sent Amount</th>
          <th>Receive Amount</th>
          <th>Store Remark</th>
          <th>Warehouse Remark</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.sku}</td>
            <td>{item.product_name}</td>
            <td>{item.product_code}</td>
            <td>{item.order_qty}</td>
            <td>{item.sent_qty}</td>
            <td>{item.received_qty}</td>
            <td>{item.supply_price_including_tax}</td>
            <td>{item.order_amount}</td>
            <td>{item.sent_amount}</td>
            <td>{item.receive_amount}</td>
            <td>{item.store_remark}</td>
            <td>{item.warehouse_remark}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        {/* Summary Mapping */}
        <tr>
          <td colSpan={4}>Total</td>
          <td>{items.reduce((sum, i) => sum + i.order_qty, 0)}</td>
          <td>{items.reduce((sum, i) => sum + i.sent_qty, 0)}</td>
          <td>{items.reduce((sum, i) => sum + i.received_qty, 0)}</td>
          <td>-</td>
          <td>{items.reduce((sum, i) => sum + i.order_amount, 0)}</td>
          <td>{items.reduce((sum, i) => sum + i.sent_amount, 0)}</td>
          <td>{items.reduce((sum, i) => sum + i.receive_amount, 0)}</td>
        </tr>
      </tfoot>
    </table>
  );
};